const { resolve } = require('path');
const Sequelize = require('sequelize');
const config = require(resolve(__dirname, '..', 'config'));

const environment = use_env_variable || 'development';

const connection = new Sequelize(`${config}.${environment}`);

module.exports = connection;
