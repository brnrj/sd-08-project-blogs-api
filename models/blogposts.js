const BlogPostsModel = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    // id: DataTypes.STRING, // gera automaticamente
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });
  return BlogPosts;
};

module.exports = BlogPostsModel;
