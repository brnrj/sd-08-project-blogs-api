module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    tableName: 'BlogPosts', timestamps: true, createdAt: 'published', updatedAt: 'updated',
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Post.belongsToMany(models.Category, {
      as: 'categories', through: 'PostsCategories', foreignKey: 'postId', otherKey: 'categoryId',
    });
  };

  return Post;
};