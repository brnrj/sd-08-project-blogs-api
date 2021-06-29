const Categories = (sequelize, DataTypes) => {
  const categories = sequelize.define('Categories', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  categories.associate = (models) => {
    categories.belongsToMany(models.BlogPosts,
      {
        through: 'PostsCategories',
        as: 'categories',
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });
  };

  return categories;
};

module.exports = Categories;
