const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    // id: DataTypes.STRING, // gera automaticamente
    name: DataTypes.STRING,
  }, { timestamps: false });

  Category.associate = (models) => {
    Category.belongsToMany(models.BlogPosts, {
      through: 'PostsCategories',
      as: 'blogposts',
    });
  };
  return Category;
};

module.exports = CategoryModel;
