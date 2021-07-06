const createPostsCategory = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories', {},
  {
    timestamps: false,
  });

  // irá usar o id de categories e o id post
  PostsCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories,
      { 
        as: 'categories', through: PostsCategories, foreignKey: 'postId', otherKey: 'categoryIds',
      });
    models.Categories.belongsToMany(models.BlogPosts,
      { as: 'blogPosts', through: PostsCategories, foreignKey: 'categoryIds', otherKey: 'postId' });
  };

  return PostsCategories;
};

module.exports = createPostsCategory;
