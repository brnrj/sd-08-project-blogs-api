const BlogPost = (sequelize, DataTypes) => {
  const blogPostTb = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  blogPostTb.associate = (models) => {
    blogPostTb.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return blogPostTb;
};

module.exports = BlogPost;
