module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostsCategory', {});

  PostCategory.associate = (models) => {
    models.Post.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.Post, {
      as: 'blogsPost',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategory;
};