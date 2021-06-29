const PostsCategories = (sequelize, DataTypes) => {
  const postsCategories = sequelize.define('PostsCategories', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true },
  }, 
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