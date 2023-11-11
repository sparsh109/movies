const express = require('express');
const router = express.Router();
const { UserController } = require('../src/controller');
const { CheckToken, ValidateUser } = require('../src/middleware')


router

    // Register or Login user
    .post('/', ValidateUser.validateEmail, ValidateUser.validatePassword, ValidateUser.isRequestValidated, UserController.SignUp)

    /* Token verification middleware */
    .use(CheckToken.checkToken)

    .get('/logout', UserController.Logout)

module.exports = router;
