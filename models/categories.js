const Categories = (sequelize, DataTypes) => {
  const CategoriesTable = sequelize.define('User', {
    name: DataTypes.STRING,
  });
  return CategoriesTable;
};

module.exports = Categories;