const BlogPosts = (sequelize, DataTypes) => {
  const PostFields = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, 
  // {
  //   timestamps: false,
  // },
  {
    updatedAt: 'updated',
    createdAt: 'published',
  });

  PostFields.associate = (models) => {
    PostFields.belongsTo(models.User);
      // { foreignKey: 'userId', as: 'posts' }
  };

  return PostFields;
};

module.exports = BlogPosts;
