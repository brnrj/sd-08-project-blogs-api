const PostsCategories = (sequelize, DataTypes) => {
  const PostsCategoriesTable = sequelize.define('UserBook',
    { postId: DataTypes.INTEGER, categoryId: DataTypes.INTEGER },
    { timestamps: false });

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