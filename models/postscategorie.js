const PostsCategories = (sequelize) => {
  const postsCategories = sequelize.define('postsCategories', {
    }, { timestamps: false });
  
    PostsCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, { 
      as: 'categories',
      through: PostsCategories,
      foreignkey: 'postId',
      otherkey: 'categoryId', 
    });
  
    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'blogPosts',
      through: PostsCategories,
      foreignkey: 'categoryId',
      otherkey: 'postId', 
    });
  };  
  return postsCategories;
};

module.exports = PostsCategories;