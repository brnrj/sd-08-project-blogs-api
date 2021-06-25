const Categories = (sequelize, DataTypes) => {
  const Category = sequelize.define('Categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  });

  Category.associate = (models) => {
    Category.hasMany(models.PostCategories,
      { foreignKey: 'categoryId', as: 'blogposts' });
  };

  return Category;
};

module.exports = Categories; 
