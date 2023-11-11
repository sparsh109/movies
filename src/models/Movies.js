const { DBConnection } = require('../config');
const sequelize = require('sequelize');

const Movie = DBConnection.define('movies', {
  movieId: {
    type: sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: sequelize.STRING,
    allowNull: false,
  },
  castMembers: {
    type: sequelize.ARRAY(sequelize.STRING),
    allowNull: false,
  },
  genre: {
    type: sequelize.STRING,
    allowNull: false,
  },
  releaseDate: {
    type: sequelize.DATE,
    allowNull: false,
  },
  addedBy:{
    type: sequelize.BIGINT,
    allowNull: false,
  },
  status:{
    type: sequelize.SMALLINT,
    defaultValue: 1,
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

module.exports = Movie;