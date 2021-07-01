module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory', {}, { timestamps: false });

  PostsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PostsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: PostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostsCategory;
};
