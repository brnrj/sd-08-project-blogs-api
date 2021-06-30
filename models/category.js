const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    // id: DataTypes.STRING, // gera automaticamente
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  return Category;
};

module.exports = CategoryModel;
