const BlogPosts = (sequelize, DataTypes) => {
  const posts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false });
  posts.associate = (models) => {
    posts.belongsTo(models.Users, 
      { as: 'user', foreignKey: 'userId' });
  };
  return posts;
};

module.exports = BlogPosts;