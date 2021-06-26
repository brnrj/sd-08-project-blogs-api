const BlogPost = (sequelize, DataTypes) => {
  const blogPostSchema = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  },
  {
    underscored: true,
  });

  blogPostSchema.associate = (models) => {
    blogPostSchema.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return blogPostSchema;
};

module.exports = BlogPost;
