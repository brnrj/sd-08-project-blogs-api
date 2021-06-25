const PostsCategories = (sequelize, _DataTypes) => {
  const postsCategories = sequelize.define('PostsCategories', {}, 
  { timestamps: false });

  return postsCategories;
};

PostsCategories.associate = (models) => {
  models.BlogPosts.belongsToMany(models.Categories, {
    foreignKey: 'id',
    as: 'postId',
    through: 'PostsCategories',
    otherKey: 'id',
  });

  models.Categories.belongsToMany(models.BlogPosts, {
    foreignKey: 'id',
    as: 'categoryId',
    through: 'PostsCategories',
    otherKey: 'id',
  });
};

module.exports = PostsCategories;