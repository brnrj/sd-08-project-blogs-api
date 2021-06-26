const PostsCategories = (sequelize, _DataTypes) => {
  const PostsCategoriesTable = sequelize.define('UserBook',
    {}, { timestamps: false });

    PostsCategoriesTable.associate = (models) => {
    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'blogposts',
      through: PostsCategoriesTable,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categories',
      through: PostsCategoriesTable,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostsCategoriesTable;
};

module.exports = PostsCategories;