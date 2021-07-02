const BlogPosts = (sequelize, DataTypes) => {
  const posts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, 
  { 
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
    tableName: 'BlogPosts',
  });
  posts.associate = (models) => {
    posts.belongsTo(models.Users, { as: 'user' });
    posts.belongsToMany(models.Categories, { through: 'PostCategories', as: 'categories' });
  };
  return posts;
};

module.exports = BlogPosts;