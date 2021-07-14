const blogPosts = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
  },
  { createdAt: 'published',
    updatedAt: 'updated',
    timestamps: true });
    
  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users, {
      as: 'user',
      foreignKey: 'userId',
    });
  };
  return BlogPosts;
};

module.exports = blogPosts;