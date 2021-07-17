module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Categories', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  }, { tableName: 'Categories' });
  Category.associate = (models) => {
    Category.belongsToMany(models.Post, {
      through: 'PostsCategories',
      as: 'posts',
    });
  };
  return Category;
};
