const { Model, DataTypes } = require('sequelize');

class Posts extends Model {
  static init(sequelize) {
    super.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize, timestamps: false,
    });
  }
}

module.exports = Posts;