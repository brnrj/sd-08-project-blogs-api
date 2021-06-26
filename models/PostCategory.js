module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  });
  return BlogPost;
};