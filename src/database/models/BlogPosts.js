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
      sequelize,
      createdAt: 'published',
      updatedAt: 'updated',
    });
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'id', as: 'user' });
    this.belongsToMany(models.Categories, {
      foreignKey: 'postId',
      as: 'categories',
      through: 'PostsCategories',
    });
  }
}

module.exports = BlogPosts;