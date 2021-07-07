const categoriesTable = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: { type: DataTypes.STRING },
  }, { timestamps: false });
  return Categories;
};
module.exports = categoriesTable;