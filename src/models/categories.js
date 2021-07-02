const Categories = (sequelize, DataTypes) => {
  const CategoriesTable = sequelize.define('Categories', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  return CategoriesTable;
};

module.exports = Categories;