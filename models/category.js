module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  // Category.associate = (models) => {
  //   Category.belongsToMany(models.BlogPost,
  //     {
  //       through: 'PostsCategories',
  //       as: 'postcategories',
  //       foreignKey: 'categoryId',
  //     });
  // };

  return Category;
};