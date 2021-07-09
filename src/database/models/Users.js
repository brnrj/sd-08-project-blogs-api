const { Model, DataTypes } = require('sequelize');

class Users extends Model {
  static init(sequelize) {
    super.init({
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: { type: DataTypes.STRING },
    }, {
      sequelize, timestamps: false,
    });
  }
}

module.exports = Users;