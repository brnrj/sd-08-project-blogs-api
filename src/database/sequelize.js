const Sequelize = require('sequelize');
const environment = require('./config/environment.js');
const Users = require('./models/Users');
const Categories = require('./models/Categories');
const BlogPosts = require('./models/BlogPosts');

const sequelize = new Sequelize(environment.development);
Users.init(sequelize);
Categories.init(sequelize);
BlogPosts.init(sequelize);
Users.associate(sequelize.models);
BlogPosts.associate(sequelize.models);

module.exports = sequelize;