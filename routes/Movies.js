const express = require('express');
const router = express.Router();
const { MovieController } = require('../src/controller');
const { CheckToken, ValidateMovies } = require('../src/middleware')


router
    /* Token verification middleware */
    .use(CheckToken.checkToken)
    
    .get('/', MovieController.getMovies)

    .post('/addMovie', ValidateMovies.validateMovie,  ValidateMovies.isRequestValidated, MovieController.addMovie)

    .post('/updateMovies', ValidateMovies.validateMovie, ValidateMovies.isRequestValidated, MovieController.updateMovies)

    .get('/deleteMovie', ValidateMovies.validateMovieId,  ValidateMovies.isRequestValidated, MovieController.deleteMovie)


module.exports = router;
