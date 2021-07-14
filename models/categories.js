const categoriesMethods = (sequelize, DataTypes) => {
  const result = sequelize.define(
    'Categories',
    {
      name: DataTypes.STRING,
    },
    { timestamps: false },
  );

  result.associate = (models) => {
    result.belongsToMany(models.BlogPosts, {
      through: 'PostsCategories',
      as: 'blogposts',
      foreignKey: 'categoryId',
      timestamps: false,
    });
  };
  return result;
};

module.exports = categoriesMethods;
