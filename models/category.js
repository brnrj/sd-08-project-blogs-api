module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, { tableName: 'Categories' });

  Category.associate = (models) => {
    Category.belongsToMany(models.Post, {
      through: 'PostsCategories',
      as: 'posts',
    });
  };

  return Category;
};
