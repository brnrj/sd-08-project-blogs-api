module.exports = (sequelize, _DataTypes) => {
  const PostCategorie = sequelize.define('PostsCategories',
    {},
    { timestamps: false });

  PostCategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: 'PostsCategories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogPost',
      through: 'PostsCategories',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return PostCategorie;
};
