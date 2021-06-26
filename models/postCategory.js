module.exports = (sequelize, _DataTypes) => {
  const postCategory = sequelize.define('PostCategory',
    {},
    { timestamps: false });

  postCategory.associate = (models) => {
    models.Post.belongsToMany(models.Category, {
      as: 'categories',
      through: postCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.Post, {
      as: 'posts',
      through: postCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postCategory;
};