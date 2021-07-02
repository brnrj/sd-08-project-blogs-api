const PostCategory = (sequelize, _DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory', {
  }, { timestamps: false });

  PostCategoryTable.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: 'PostsCategories',
      foreignKey: 'postId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: 'PostsCategories',
      foreignKey: 'categoryId',
    });
  };

  return PostCategoryTable;
};

module.exports = PostCategory;