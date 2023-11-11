const moment = require('moment');
const {error} = require('./Logger');

/**
 * 
 * @param {*} res 
 * @param {Number} status 
 * @param {Number} code 
 * @param {String} title 
 * @param {String} message 
 * @param {Object} data 
 * @returns 
 */
const sendResponse = async (res, status, code, title, message, data = {}) => {
    try {
        return res.status(200).json({
            "status": status,
            "code": code,
            "title": title,
            "message": message,
            "data": data,
            "server_timestamp": new Date(moment()).getTime(),
        });  
    } catch (Error) {
        error(`Error sendResponse ${Error}`)
    }
}

module.exports = sendResponse;