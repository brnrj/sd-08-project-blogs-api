const BlogPosts = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, references: { model: 'User', key: 'id' } },
  }, {
    timestamps: true, createdAt: 'published', updatedAt: 'updated',
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    BlogPost.belongsToMany(models.Categories,
      { through: 'PostsCategories',
        as: 'categories',
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
  };

  return BlogPost;
};

module.exports = BlogPosts;
