module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {}, { timestamps: false });
  
  PostCategory.associate = (models) => {
    models.Post.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'id',
    });
    models.Category.belongsToMany(models.Post, {
      as: 'posts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'id',
    });
  };

  return PostCategory;
};
