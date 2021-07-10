const { Model, DataTypes } = require('sequelize');

class BlogPosts extends Model {
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

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'id' });
    this.belongsToMany(models.Categories, {
      through: 'PostsCategories',
      foreignKey: 'postId',
    });
  }
}

module.exports = BlogPosts;