const Category = (sequelize, DataTypes) => {
  const CategoryFields = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, 
  {
    timestamps: false,
  });
  return CategoryFields;
};

module.exports = Category;
