const Sequelize = require('sequelize');
const {Logger} = require('../helper');
const config = require('./Config')

const DBConnection = new Sequelize(config.DB.NAME, config.DB.USER, config.DB.PASSWORD, {
    host: config.DB.HOST,
    dialect: config.DB.USER,

    pool:{
        max: 2,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
});

DBConnection.authenticate()
    .then(()=>{
        console.log("DB Connected!")
    })
    .catch((error)=>{
        Logger.error(`DB Connection error: ${error}`)
    })

module.exports = DBConnection;