const jwt = require('jsonwebtoken');
const { Logger, sendResponse } = require('../helper');
const { StatusConstant } = require('../constants');
const usersQuery  = require('../dbqueries/Users');
const bcrypt = require('bcrypt');

class users {
    
    async SignUp(req, res) {
        try{
            let password = req.body.password;
            const emailId = req.body.emailId.toLowerCase();
            let hashedPassword;
            let registrationStatus = 0;

            //Check if email already exists
            let user = await usersQuery.getUser(['userId', 'password'],{email: emailId})
            
            if(!user){ // Register user
                hashedPassword = await hashPassword(password);
                const newUser = await usersQuery.createUser({
                    email: emailId,
                    password: hashedPassword,
                    jwtToken: ''
                });

                if(!newUser){
                    return sendResponse(res, false, StatusConstant.STATUS_CODE.ERROR, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.SERVER_ERROR, {});
                }

                user = {
                    password: hashedPassword,
                    userId: newUser.userId
                }
                registrationStatus = 1;
            }
            
            const loginStatus = await logIn(emailId, password, user.password, user.userId);

            return sendResponse(res, loginStatus.status, loginStatus.code, loginStatus.title,  registrationStatus ? StatusConstant.STATUS_MESSAGE.ACCOUNT_CREATED : loginStatus.message, loginStatus.response);
        }catch(error){
            Logger.error(`Error: ${error}`);
            return sendResponse(res, false, StatusConstant.STATUS_CODE.SERVER_ERROR, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.SERVER_ERROR, {});
        }
    }

    async Logout(req, res) {
        try{
            const {userId, jwtToken} = req.user

            //Update user token in db
            const status = await usersQuery.updateUser({jwtToken: ''}, {userId: userId})

            if(!status)
                return sendResponse(res, false, StatusConstant.STATUS_CODE.ERROR, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.SERVER_ERROR, {});
            
            //Delete token from redis
            await global.redis.del(jwtToken);

            return sendResponse(res, true, StatusConstant.STATUS_CODE.SUCCESS, StatusConstant.STATUS_MESSAGE.TYPE_SUCCESS,  StatusConstant.STATUS_MESSAGE.LOGGED_OUT, {});
        }catch(error){
            Logger.error(`Error Logout: ${error}`);
            return sendResponse(res, false, StatusConstant.STATUS_CODE.SERVER_ERROR, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.SERVER_ERROR, {});
        }
    }
}


const logIn = async (emailId, plainTextPassword, hashedPassword, userId) => {
    try{
        const isPasswordMatched = await comparePasswords(plainTextPassword, hashedPassword)

        if(!isPasswordMatched){
            return {
                status: true,
                code: StatusConstant.STATUS_CODE.Not_found,
                title: StatusConstant.STATUS_MESSAGE.TYPE_SUCCESS,
                message: StatusConstant.STATUS_MESSAGE.UNAUTHORIZED_USER,
                response: {}
            }
        }

        //Create token for session management
        const token = await generateToken({emailId, userId});
        
        if(!token){
            return {
                status: false,
                code: StatusConstant.STATUS_CODE.ERROR,
                title: StatusConstant.STATUS_MESSAGE.TYPE_ERROR,
                message: StatusConstant.STATUS_MESSAGE.SERVER_ERROR,
                response: {}
            }
        }

        //Update user token in db
        const status = await usersQuery.updateUser({jwtToken: token}, {userId})

        if(!status){
            return {
                status: false,
                code: StatusConstant.STATUS_CODE.ERROR,
                title: StatusConstant.STATUS_MESSAGE.TYPE_ERROR,
                message: StatusConstant.STATUS_MESSAGE.SERVER_ERROR,
                response: {}
            }
        }
        
        //Set updated token to redis
        await global.redis.set(token, JSON.stringify(token), 'ex', StatusConstant.TOKEN_EXPIRY.REDIS);

        return {
            status: true,
            code: StatusConstant.STATUS_CODE.SUCCESS,
            title: StatusConstant.STATUS_MESSAGE.TYPE_SUCCESS,
            message: StatusConstant.STATUS_MESSAGE.LOGGED_IN,
            response: {
                token: token
            }
        }
    }catch(error){
        Logger.error(`Error logIn: ${error}`);
        return {
            status: false,
            code: StatusConstant.STATUS_CODE.ERROR,
            title: StatusConstant.STATUS_MESSAGE.TYPE_ERROR,
            message: StatusConstant.STATUS_MESSAGE.SERVER_ERROR,
            response: {}
        };
    }
}

/**
 * 
 * @param {Object} userDetail 
 * @returns 
 */
const generateToken = async (userDetail) => {
    try{
        return await jwt.sign(userDetail, process.env.GUEST_SECRET, { expiresIn: StatusConstant.TOKEN_EXPIRY.JWT });
    }catch(error){
        Logger.error(`Error generateToken: ${error}`);
        return false;
    }
}

/**
 * 
 * @param {String} plainTextPassword 
 * @returns 
 */
// Function to hash a password
const hashPassword = async (plainTextPassword) => {
    const saltRounds = 10; // The number of salt rounds determines the computational cost (higher is more secure but slower)
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword;
};

/**
 * 
 * @param {String} plainTextPassword 
 * @param {String} hashedPassword 
 * @returns 
 */
// Compare a plain text password with a hashed password
const comparePasswords = async (plainTextPassword, hashedPassword) => {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
};


module.exports = new users();