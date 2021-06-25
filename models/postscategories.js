const PostCategories = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategories', {
    postId: { type: DataTypes.INTEGER, foreignKey: true },
    categoryId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });

  PostCategory.associate = (models) => {
    PostCategory.belongsTo(models.BlogPosts,
      { foreignKey: 'postId', as: 'posts' });
  };

  PostCategory.associate = (models) => {
    PostCategory.belongsTo(models.Categories,
      { foreignKey: 'categoryId', as: 'categories' });
  };

  return PostCategory;
};

module.exports = PostCategories;
