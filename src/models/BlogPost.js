const BlogPost = (sequelize, DataTypes) => {
  const BlogPostFields = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER,
              foreignKey: true,
            },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    createdAt: 'published',
    updatedAt: 'updated',
  });

  BlogPostFields.associate = (models) => {
    BlogPostFields.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return BlogPostFields;
};

module.exports = BlogPost;
