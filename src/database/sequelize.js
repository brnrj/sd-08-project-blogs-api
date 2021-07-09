const Sequelize = require('sequelize');
const environment = require('./config/environment.js');
const Users = require('./models/Users');

const sequelize = new Sequelize(environment.development);
Users.init(sequelize);

module.exports = sequelize;