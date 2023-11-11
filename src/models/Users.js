const { DBConnection } = require('../config');
const  sequelize = require('sequelize');

const User = DBConnection.define('users', {
    userId: {
        type: sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    email: {
        type: sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize.STRING,
        allowNull: false,
    },
    jwtToken: {
        type: sequelize.STRING,
        allowNull: false,
    },
    createdAt: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
        allowNull: false,
    },
});

module.exports = User;