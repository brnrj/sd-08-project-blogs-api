module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: DataTypes.STRING,
  });

  Categories.associate = (models) => {
    Categories.belongsToMany(models.BlogPosts, {
      through: 'PostsCategories',
      foreignKey: 'categoryId',
    });
  };

  return Categories;
};
