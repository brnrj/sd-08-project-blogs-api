const PostsCategories = (sequelize, _DataTypes) => {
  const postCategories = sequelize.define('PostsCategories',
  {
    
  }, { timestamps: false });

  return postCategories;
};

module.exports = PostsCategories;