const { DataTypes } = require('sequelize');

const sequelize = require('../index');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'Categories',
  timestamps: false,
});

module.exports = Category;
