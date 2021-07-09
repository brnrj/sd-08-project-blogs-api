const Sequelize = require('sequelize');
const environment = require('./config/environment.js');
const Users = require('./models/Users');
const Categories = require('./models/Categories');

const sequelize = new Sequelize(environment.development);
Users.init(sequelize);
Categories.init(sequelize);

module.exports = sequelize;