const Post = (sequelize, DataTypes) => {
  const PostTable = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignkey: true },
  }, {
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
  });

  PostTable.associate = (models) => {
    PostTable.belongsTo(models.User,
      {
        foreignkey: 'userId', as: 'user',
      });
  };

  return PostTable;
};

module.exports = Post;
