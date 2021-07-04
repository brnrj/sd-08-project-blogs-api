const BlogPosts = (sequelize, DataTypes) => {
  const BlogPostsI = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    categoryIds: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
  });
  BlogPostsI.associate = (models) => {
    BlogPostsI.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'users',
      });
  };
  return BlogPostsI;
};

module.exports = BlogPosts;
