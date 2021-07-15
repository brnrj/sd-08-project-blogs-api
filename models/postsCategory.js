module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategories',
    {},
    { timestamps: false, tableName: 'PostsCategories' });

  PostsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'posts',
      through: PostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.Category.belongsToMany(models.BlogPost, {
        as: 'categories',
        through: PostsCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
  };
  return PostsCategory;
};
