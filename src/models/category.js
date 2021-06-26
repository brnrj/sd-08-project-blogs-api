module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING, allowNull: false },
  }, {
    timestamps: false,
  });

  Category.associate = (models) => {
    Category.hasMany(models.PostsCategory,
      { foreignKey: 'categoryId', as: 'categories' });
  };

  return Category;
};