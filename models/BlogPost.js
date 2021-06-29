const fields = (DataTypes) => ({
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  userId: DataTypes.INTEGER,
  published: DataTypes.DATE,
  updated: DataTypes.DATE,
});

module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', fields(DataTypes), {
    timestamps: false,
  });
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return BlogPost;
};
