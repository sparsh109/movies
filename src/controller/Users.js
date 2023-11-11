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

            //Check if email already exists
            const user = await usersQuery.getUser(['userId'],{email: emailId})
            if(user){
                return sendResponse(res, true, StatusConstant.STATUS_CODE.SUCCESS, StatusConstant.STATUS_MESSAGE.TYPE_SUCCESS,  StatusConstant.STATUS_MESSAGE.EMAIL_ALREADY_EXIST_INFO, {});
            }

            //Create token for session management
            const token = await generateToken({emailId});

            if(!token){
                return sendResponse(res, false, StatusConstant.STATUS_CODE.ERROR, StatusConstant.STATUS_MESSAGE.SERVER_ERROR,  StatusConstant.STATUS_MESSAGE.SERVER_ERROR, {});
            }

            password = await hashPassword(password);

            //Create a new user
            const status = await usersQuery.createUser({
                email: emailId,
                password: password,
                jwtToken: token
            });

            if(!status){
                return sendResponse(res, false, StatusConstant.STATUS_CODE.ERROR, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.SERVER_ERROR, {});
            }

            //Set updated token to redis
            await global.redis.set(token, JSON.stringify(token), 'ex', StatusConstant.TOKEN_EXPIRY.REDIS);

            const response = {
                token: token
            }
            return sendResponse(res, true, StatusConstant.STATUS_CODE.SUCCESS, StatusConstant.STATUS_MESSAGE.TYPE_SUCCESS,  StatusConstant.STATUS_MESSAGE.ACCOUNT_CREATED, response);
        }catch(error){
            Logger.error(`Error: ${error}`);
            return sendResponse(res, false, StatusConstant.STATUS_CODE.SERVER_ERROR, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.SERVER_ERROR, {});
        }
    }

    async Login(req, res) {
        try{
            const {password} = req.body;
            const emailId = req.body.emailId.toLowerCase();

            //Check if email exists
            const user = await usersQuery.getUser(['userId', 'password'],{email: emailId})

            if(!user){
                return sendResponse(res, true, StatusConstant.STATUS_CODE.Not_found, StatusConstant.STATUS_MESSAGE.TYPE_SUCCESS,  StatusConstant.STATUS_MESSAGE.UNAUTHORIZED_USER, {});
            }

            const isPasswordMatched = await comparePasswords(password, user.password)

            if(!isPasswordMatched){
                return sendResponse(res, true, StatusConstant.STATUS_CODE.Not_found, StatusConstant.STATUS_MESSAGE.TYPE_SUCCESS,  StatusConstant.STATUS_MESSAGE.UNAUTHORIZED_USER, {});
            }

            //Create token for session management
            const token = await generateToken({emailId, userId: user.userId});
            
            if(!token){
                return sendResponse(res, false, StatusConstant.STATUS_CODE.ERROR, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.SERVER_ERROR, {});
            }

            //Update user token in db
            const status = await usersQuery.updateUser({jwtToken: token}, {userId: user.userId})

            if(!status)
                return sendResponse(res, false, StatusConstant.STATUS_CODE.ERROR, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.SERVER_ERROR, {});
            
            //Set updated token to redis
            await global.redis.set(token, JSON.stringify(token), 'ex', StatusConstant.TOKEN_EXPIRY.REDIS);

            //Update token
            const response = {
                token: token
            }
            return sendResponse(res, true, StatusConstant.STATUS_CODE.SUCCESS, StatusConstant.STATUS_MESSAGE.TYPE_SUCCESS,  StatusConstant.STATUS_MESSAGE.LOGGED_IN, response);
        }catch(error){
            Logger.error(`Error Login: ${error}`);
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