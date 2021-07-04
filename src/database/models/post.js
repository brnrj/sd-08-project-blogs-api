module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
    tableName: 'BlogPosts',
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { as: 'user' });
    Post.belongsToMany(models.Category, {
      through: 'PostsCategories',
      as: 'categories',
    });
  };

  return Post;
};
