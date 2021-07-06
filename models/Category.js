module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryId: { type: DataTypes.INTEGER, primaryKey: true },
    categoryName: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Categories',
    underscored: true,
  });

  return Category;
};