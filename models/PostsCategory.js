const PostsCategories = (sequelize, DataTypes) => {
  const PostsCategoriesI = sequelize.define('PostsCategory', {
    postId: { type: DataTypes.INTEGER, foreignKey: true },
    categoryId: { type: DataTypes.INTEGER, foreignKey: true } }, { timestamps: false });
  PostsCategoriesI.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: PostsCategoriesI,
    });
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: PostsCategoriesI,
      as: 'categories',
    });
  };
  return PostsCategoriesI;
};

module.exports = PostsCategories;
