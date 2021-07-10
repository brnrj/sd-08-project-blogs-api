const { Model, DataTypes } = require('sequelize');

class Categories extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    }, {
      sequelize, timestamps: false,
    });
  }

  static associate(models) {
    this.belongsToMany(models.Categories, {
      through: 'PostsCategories',
      as: 'categories',
      foreignKey: 'categoryId',
    });
  }
}

module.exports = Categories;