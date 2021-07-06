module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
  },
  {
    timestamps: false,
    tableName: 'BlogPosts',
    underscored: true,
  });

  Post.associate = (models) => {
    Post.hasOne(models.User,
      { foreignKey: 'id', as: 'users' });
  };

  return Post;
};
