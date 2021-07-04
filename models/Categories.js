const defineCategoriesModel = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    'Categories',
    {
      name: DataTypes.STRING,
    },
    { timestamps: false },
  );
  return Categories;
};

module.exports = defineCategoriesModel;
