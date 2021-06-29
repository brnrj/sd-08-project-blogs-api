const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    // id: DataTypes.STRING, // gera automaticamente
    name: DataTypes.STRING,
  });

  return Category;
};

module.exports = CategoryModel;
