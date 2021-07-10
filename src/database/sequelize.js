const Sequelize = require('sequelize');
const environment = require('./config/environment.js');
const { Users, Categories, BlogPosts } = require('./models');

const sequelize = new Sequelize(environment.development);

Users.init(sequelize);
Categories.init(sequelize);
BlogPosts.init(sequelize);

Users.associate(sequelize.models);
Categories.associate(sequelize.models);
BlogPosts.associate(sequelize.models);

module.exports = sequelize;