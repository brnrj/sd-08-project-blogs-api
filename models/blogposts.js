const BlogPosts = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    createdAt: { type: DataTypes.DATE, field: 'published' },
    updatedAt: { type: DataTypes.DATE, field: 'updated' },
    userId: DataTypes.INTEGER,
  }, {
    timestamps: true,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsToMany(models.Categories,
      { through: 'PostsCategories' });
  };

  return BlogPost;
};

module.exports = BlogPosts;
