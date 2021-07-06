const Post = (sequelize, DataTypes) => {
  const newPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  { timestamps: false });
  newPost.associate = (models) => {
    newPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return newPost;
};

module.exports = Post;