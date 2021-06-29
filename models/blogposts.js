const BlogPostsModel = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    // id: DataTypes.STRING, // gera automaticamente
    content: DataTypes.STRING,
    userId: DataTypes.STRING, // esse é o id que referência usuário que é o autor do post
    published: DataTypes.STRING,
    updated: DataTypes.STRING,
  });

  return BlogPosts;
};

module.exports = BlogPostsModel;
