const { resolve } = require('path');
const Sequelize = require('sequelize');
const config = require(resolve(__dirname, '..', 'config'));

const enviroment = 'development';

const connection = new Sequelize(`${config}.${enviroment}`);

module.exports = connection;
