const Categories = (sequelize, DataTypes) => {
  const CategoriesTable = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  });
  return CategoriesTable;
};

module.exports = Categories;