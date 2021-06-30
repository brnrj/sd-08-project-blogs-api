const PostCategorieModel = (sequelize, __DataTypes) => {
  const PostsCategorie = sequelize.define('PostsCategorie',
  {},
  {
    timestamps: false,
  });

  PostsCategorie.associate = (models) => {
    models.Categorie.belongsToMany(models.BlogPost,
      { as: 'BlogPost', through: PostsCategorie, foreignKey: 'categoryId', otherKey: 'postId' });
    models.BlogPost.belongsToMany(models.Categorie,
      { as: 'categories', through: PostsCategorie, foreignKey: 'postId', otherKey: 'categoryId' });
  };
  return PostsCategorie;
};

module.exports = PostCategorieModel;
