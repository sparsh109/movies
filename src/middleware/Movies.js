const { body, query, validationResult } = require('express-validator');
const { StatusConstant } = require('../constants');
const { sendResponse } = require('../helper');
const moment = require('moment');

exports.validateMovie= [
    body('name')
    .notEmpty()
    .withMessage({ message: 'Movie name is required'}),
    body('rating')
    .notEmpty()
    .withMessage({ message: 'Movie rating is required'})
    .isNumeric()
    .withMessage({ message: 'Movie rating should be numeric!'}),
    body('cast')
    .notEmpty().withMessage({ message: 'Movie cast is required'})
    .isArray().withMessage({ message: 'Movie cast should be a array'})
    .custom((item) => { 
      for(let i =0; i < item.length; i++ ) { 
        if ( !item[i].name || !item[i].role) { 
          return 0
        }else{
          item[i] = {
            name: item[i].name,
            role: item[i].role
          }
        } 
      }
      return 1 
    }).withMessage({ message: 'Please provide the correct names and their roles in the cast!'}),
    body('genre')
    .notEmpty()
    .withMessage({ message: 'Movie genre is required'}),
    body('releaseDate')
    .notEmpty()
    .withMessage({ message: 'Movie release date is required'})
    .custom((value) => {
      if (!moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
          return 0;
      }
      return 1;
    }).withMessage({ message: 'Please provide a valid release date!'}),
]

exports.validateMovieId = [
  query('movieId')
  .notEmpty()
  .withMessage({ message: 'Movie is required'})
  .isNumeric()
  .withMessage({ message: 'Please provide a valid movie'})
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