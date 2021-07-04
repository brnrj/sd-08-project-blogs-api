const Categories = (sequelize, DataTypes) => {
  const CategoriesI = sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  return CategoriesI;
};

module.exports = Categories;
