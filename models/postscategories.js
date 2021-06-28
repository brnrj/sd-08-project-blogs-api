const PostsCategories = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostsCategories',
    {},
    { timestamps: false });

  PostCategory.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, { through: PostCategory });
    models.Categories.belongsToMany(models.BlogPosts, { through: PostCategory });
  };
  return PostCategory;
};

module.exports = PostsCategories;
