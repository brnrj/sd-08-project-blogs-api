const BlogPosts = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPosts', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'user' });
  };

  BlogPost.associate = (models) => {
    BlogPost.hasMany(models.PostCategories,
      { foreignKey: 'categoryId', as: 'category' });
  };

  return BlogPost;
};

module.exports = BlogPosts;
