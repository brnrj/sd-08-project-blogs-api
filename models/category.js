const createCategory = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  Category.associate = (models) => {
    Category.belongsToMany(models.BlogPost, {
      as: 'blogs',
      through: 'PostsCategories',
    });
  };
  return Category;
};

module.exports = createCategory;
