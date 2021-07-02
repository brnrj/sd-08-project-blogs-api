const Category = (sequelize, DataTypes) => {
  const CategoryTable = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  // CategoryTable.associate = (models) => {
  //   CategoryTable.belongsToMany(models.BlogPost, {
  //       as: 'blogposts',
  //       through: 'PostsCategories',
  //       foreignKey: 'categoryId',
  //       otherKey: 'categoryId',
  //     });
  // };

  return CategoryTable;
};

module.exports = Category;
