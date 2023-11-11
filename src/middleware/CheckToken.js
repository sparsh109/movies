const jwt = require('jsonwebtoken');
const { StatusConstant } = require('../constants');
const usersQuery  = require('../dbqueries/Users')
const { Logger, sendResponse } = require('../helper');

module.exports = {
    checkToken: async (req, res, next) =>{
        try{
            let token = req.headers.authorization
            if (typeof token != 'undefined') {
                token = token.slice(7, token.length);
                token = token.toString()

                let access_token = await JSON.parse(await global.redis.get(token));
                let tokenByDb = 0;
                if (!access_token || access_token == ' ' || access_token == {} || access_token == null) {
                    const dbToken = await usersQuery.getUser(['jwtToken', 'userId'], {userId: 17});
                    access_token = dbToken.jwtToken
                    tokenByDb = 1; 
                }

                if(access_token){
                    if (access_token == token) {
                        jwt.verify(token,process.env.GUEST_SECRET, async(err, decoded) => {
                            if (err) {
                                return sendResponse(res, false, StatusConstant.STATUS_CODE.SESSION_EXPIRE, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.SESSION_EXPIRED, {});
                            } else {
                                req.decoded = decoded;
                                const userDetails = await usersQuery.getUser(['userId', 'email', 'jwtToken'], {userId: decoded.userId});
                                if (!userDetails) {
                                    return sendResponse(res, false, StatusConstant.STATUS_CODE.Unauthorized_user, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.INVALID_SESSION_ID, {})
                                } else {
                                    req.user = userDetails;
                                    
                                    if (tokenByDb){
                                        await global.redis.set(token, JSON.stringify(token))
                                    }

                                    next();
                                }
                            }
                        });
                    }else{
                        return sendResponse(res, true, StatusConstant.STATUS_CODE.Unauthorized_user, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.INVALID_SESSION_ID, {});
                    }
                }else{
                    return sendResponse(res, true, StatusConstant.STATUS_CODE.Unauthorized_user, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.INVALID_SESSION_ID, {});
                }
            }else{
                return sendResponse(res, true, StatusConstant.STATUS_CODE.Unauthorized_user, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.INVALID_SESSION_ID, {});
            }
            
        }catch(error){
            Logger.error(`Check token error: ${error}`);
            return sendResponse(res, false, StatusConstant.STATUS_CODE.SERVER_ERROR, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.SERVER_ERROR, {});
        }
    }
}