const PostsCategories = (sequelize, DataTypes) => {
  const PostsCategoriesI = sequelize.define('PostsCategory', {
    postId: { type: DataTypes.INTEGER, foreignKey: true },
    categoryId: { type: DataTypes.INTEGER, foreignKey: true } }, { timestamps: false });
  PostsCategoriesI.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: PostsCategoriesI,
      as: 'categories',
    });
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: PostsCategoriesI,
      as: 'blogPosts',
    });
  };
  return PostsCategoriesI;
};

module.exports = PostsCategories;
