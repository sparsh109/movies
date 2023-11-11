const { Logger, sendResponse } = require('../helper');
const { StatusConstant } = require('../constants')
const movieQuery  = require('../dbqueries/Movies')

class movie {

    async getMovies(req, res) {
        try{
            const { userId } = req.user;
            const page = req.query.page ? req.query.page : 1;
            const moviesPerPage = 10;

            //Get user movies
            const movies = await movieQuery.getMovies(userId, page, moviesPerPage)

            if(!Array.isArray(movies))
                return sendResponse(res, false, StatusConstant.STATUS_CODE.ERROR, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.SERVER_ERROR, {});    

            const response = {
                movies: [],
                next: movies.length == moviesPerPage ? true : false
            }

            for(let i = 0; i < movies.length; i++){
                response.movies.push(movies[i].dataValues)
            }

            return sendResponse(res, true, StatusConstant.STATUS_CODE.SUCCESS, StatusConstant.STATUS_MESSAGE.TYPE_SUCCESS,  StatusConstant.STATUS_MESSAGE.MOVIES, response);
        }catch(error){
            Logger.error(`Error getMovies: ${error}`);
            return sendResponse(res, false, StatusConstant.STATUS_CODE.SERVER_ERROR, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.SERVER_ERROR, {});
        }
    }

    //We can also make different table to store casting of movie for better use and with there role and other details
    async addMovie(req, res) {
        try{
            const { userId } = req.user;
            const {name, rating, cast, genre, releaseDate} = req.body

            const status = await movieQuery.addMovie({
                name,
                rating,
                castMembers: cast,
                genre,
                releaseDate,
                addedBy: userId
            });

            if(!status){
                return sendResponse(res, false, StatusConstant.STATUS_CODE.ERROR, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.SERVER_ERROR, {});
            }

            const response = {
                "movieId": status.movieId,
                "name": status.name,
                "rating": status.rating,
                "cast": status.castMembers,
                "genre": status.genre,
                "releaseDate": status.releaseDate,
                "status": status.status
            }

            return sendResponse(res, true, StatusConstant.STATUS_CODE.SUCCESS, StatusConstant.STATUS_MESSAGE.TYPE_SUCCESS,  StatusConstant.STATUS_MESSAGE.MOVIE_ADDED, response);
        }catch(error){
            Logger.error(`Error addMovie: ${error}`)
            return sendResponse(res, false, StatusConstant.STATUS_CODE.SERVER_ERROR, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.SERVER_ERROR, {});
        }
    }

    async updateMovies (req, res) {
        try{
            const { userId } = req.user;
            const {name, rating, cast, genre, releaseDate, movieId} = req.body

            const status = await movieQuery.updateMovie({
                name, 
                rating, 
                castMembers: cast, 
                genre, 
                releaseDate
            },{addedBy: userId, movieId})

            if(!status)
                return sendResponse(res, false, StatusConstant.STATUS_CODE.ERROR, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.SERVER_ERROR, {});

            return sendResponse(res, true, StatusConstant.STATUS_CODE.SUCCESS, StatusConstant.STATUS_MESSAGE.TYPE_SUCCESS,  StatusConstant.STATUS_MESSAGE.MOVIE_UPDATED, {});
        }catch(error){
            Logger.error(`Error updateMovies: ${error}`)
            return sendResponse(res, false, StatusConstant.STATUS_CODE.SERVER_ERROR, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.SERVER_ERROR, {});
        }
    }

    //We can can use this api to update movie status like active / inactive / delete
    async deleteMovie (req, res) {
        try{
            const { userId } = req.user;
            const movieId = req.query.movieId
            
            const status = await movieQuery.updateMovies({
                status:  StatusConstant.MOVIE_STATUS.DELETED
            },{addedBy: userId, movieId})

            if(!status)
                return sendResponse(res, false, StatusConstant.STATUS_CODE.ERROR, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.SERVER_ERROR, {});

            return sendResponse(res, true, StatusConstant.STATUS_CODE.SUCCESS, StatusConstant.STATUS_MESSAGE.TYPE_SUCCESS,  StatusConstant.STATUS_MESSAGE.MOVIE_DELETED, {});
        }catch(error){
            Logger.error(`Error deleteMovie: ${error}`)
            return sendResponse(res, false, StatusConstant.STATUS_CODE.SERVER_ERROR, StatusConstant.STATUS_MESSAGE.TYPE_ERROR,  StatusConstant.STATUS_MESSAGE.SERVER_ERROR, {});
        }
    }
}

module.exports = new movie();