const definePostModel = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'BlogPosts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    { timestamps: false },
  );
  Posts.associate = (models) => {
    Posts.belongsTo(models.User, { as: 'user',
      foreingKey: 'userId',
    });
  };
  return Posts;
};

module.exports = definePostModel;
