const { userModel } = require('../models')
const { Logger } = require('../helper');

class Users {

    /**
     * 
     * @param {Object} attributes 
     * @param {Object} where 
     * @returns 
     */
    async getUser (attributes, where) { 
        try{

            const user = await userModel.findOne({
                attributes: attributes,
                where: where
            })

            return user && user.dataValues && user.dataValues.userId ? user.dataValues : false;
        }catch(error){
            Logger.error(`Error getUserByEmail ${error}`)
            return false
        }
    }

    /**
     * 
     * @param {Object} data 
     */
    async createUser (data) {
        try{
            // Create a new user
            const newUser = await userModel.create(data);
            return newUser && newUser.dataValues && newUser.dataValues.userId ? newUser.dataValues : false
        }catch(error){
            Logger.error(`Error createUser ${error}`)
            return false
        }
    }

    /**
     * 
     * @param {Object} data 
     * @param {Object} where 
     * @returns 
     */
    async updateUser(data, where){
        try{
            const status = await userModel.update(data,{
                where: where
            })
            
            return status && status.length && status[0] == 1 ? true : false;
        }catch(error){
            Logger.error(`Error deleteMovie ${error}`)
            return false
        }
    }
}

module.exports = new Users();