module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,

  }, { timestamps: false });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return BlogPost;
};
