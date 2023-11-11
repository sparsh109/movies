const { body, validationResult } = require('express-validator');
const { StatusConstant } = require('../constants');
const { sendResponse } = require('../helper');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.validateEmail = [
    body('emailId')
      .notEmpty()
      .withMessage({ message: 'Email id is required'})
      .custom((email) => { 
        if(!emailRegex.test(email)){
          return 0;
        }
        return 1 
      }).withMessage({ message: 'Please provide a valid email address!'})

]

exports.validatePassword = [
    body('password')
    .notEmpty()
    .withMessage({ message: 'Password id is required!'})
    .isLength({ min: 5 })
    .withMessage({ message: 'Password must be at least 5 character long!'})
    .isLength({ max: 30 })
    .withMessage({ message: 'Password cannot be longer than 30 characters!'})
]

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      let msg = errors.array()[0].msg;
      msg = msg ? msg.message : "Error"
      return sendResponse(res, false, StatusConstant.STATUS_CODE.ERROR, StatusConstant.STATUS_MESSAGE.TYPE_ERROR, msg.type, msg);
    }
    next()
}