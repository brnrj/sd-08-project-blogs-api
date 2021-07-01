const BlogPost = (sequelize, DataTypes) => {
  const createBlogPost = sequelize.define('BlogPost', {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
  },
    { updatedAt: 'updated', createdAt: 'published' });
    createBlogPost.associate = (models) => {
      createBlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    createBlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: 'PostsCategories',
    });
  };
  return createBlogPost;
};

module.exports = BlogPost;
