const express = require('express');
const router = express.Router();
const { UserController } = require('../src/controller');
const { CheckToken, ValidateUser } = require('../src/middleware')


router

    .post('/signup', ValidateUser.validateEmail, ValidateUser.validatePassword, ValidateUser.isRequestValidated, UserController.SignUp)

    .post('/login', ValidateUser.validateEmail, ValidateUser.validatePassword, ValidateUser.isRequestValidated, UserController.Login)

    /* Token verification middleware */
    .use(CheckToken.checkToken)

    .get('/logout', UserController.Logout)

module.exports = router;
