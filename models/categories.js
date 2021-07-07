module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.Post, {
      as: 'blogsPost',
      through: 'PostsCategories',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return Category;
};