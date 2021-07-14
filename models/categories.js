const createCategories = (sequelize, DataTypes) => {
  const category = sequelize.define('Categories', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  category.associate = (models) => {
    category.belongsToMany(models.BlogPosts, {
      through: 'PostsCategories',
      as: 'blogposts',
      foreignKey: 'categoryId',
      timestamps: false,
    });
  };
  return category;
};

module.exports = createCategories;