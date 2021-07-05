const definePostCategoriesModel = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory', 
  {}, 
  { timestamps: false });

PostsCategory.associate = (models) => {
  models.BlogPosts.belongsToMany(models.Categories, {
    as: 'categories',
    through: PostsCategory,
    foreignKey: 'postId',
    otherKey: 'categoryId',
  });

  models.Categories.belongsToMany(models.BlogPosts, {
    as: 'BlogPosts',
    through: PostsCategory,
    foreignKey: 'categoryId',
    otherKey: 'postId',
  });
};

return PostsCategory;
};

module.exports = definePostCategoriesModel;
