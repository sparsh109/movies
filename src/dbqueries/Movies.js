const { movieModel } = require('../models')
const { Logger } = require('../helper');
const { StatusConstant } = require('../constants')

class Movies {
    /**
     * 
     * @param {Object} data 
     * @returns 
     */
    async addMovie(data) {
        try{
            // Add a new movie
            const newMovie = await movieModel.create(data);
            return newMovie && newMovie.dataValues && newMovie.dataValues.movieId ? newMovie.dataValues : false
        }catch(error){
            Logger.error(`Error createMovie ${error}`)
            return false
        }
    }

    /**
     * 
     * @param {Number} userId 
     * @returns 
     */
    async getMovies(userId, page, moviesPerPage) {
        try{

            return await movieModel.findAll({
                attributes: ["movieId", "name", "rating", "castMembers", "genre", "releaseDate", "status"],
                where: { addedBy: userId, status: StatusConstant.MOVIE_STATUS.ACTIVE },
                order: [['releaseDate', 'ASC']],
                limit: moviesPerPage,
                offset: (page - 1) * moviesPerPage,
            });
            
        }catch(error){
            Logger.error(`Error createMovie ${error}`)
            return []
        }
    }


    /**
     * 
     * @param {Object} data 
     * @param {Object} where 
     * @returns 
     */
    async updateMovie(data, where){
        try{
            const status = await movieModel.update(data,{
                where: where
            })
            console.log(status)
            return status && status.length && status[0] == 1 ? true : false;
        }catch(error){
            Logger.error(`Error updateMovie ${error}`)
            return false
        }
    }
}

module.exports = new Movies();