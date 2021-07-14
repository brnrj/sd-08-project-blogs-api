const blogPosts = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
  },
  { createdAt: 'published',
    updatedAt: 'updated',
    timestamps: true });
    
  BlogPosts.associate = (models) => {
    BlogPosts.belongsToMany(models.Categories, {
      through: 'PostsCategories',
      as: 'categories',
      foreignKey: 'postId',
      timestamps: false,
    });
  };
  return BlogPosts;
};

module.exports = blogPosts;