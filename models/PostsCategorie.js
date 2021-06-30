const PostCategorieModel = (sequelize, __DataTypes) => {
  const PostsCategorie = sequelize.define('PostsCategorie',
  {},
  {
    timestamps: false,
  });
  PostsCategorie.associate = (models) => {
    models.Categorie.belongsToMany(models.BlogPost,
      { as: 'BlogPost', through: PostsCategorie, foreignKey: 'categorieId', otherKey: 'postId' });
    models.BlogPost.belongsToMany(models.Categorie,
      { as: 'Categorie', through: PostsCategorie, foreignKey: 'postId', otherKey: 'categorieId' });
  };
  return PostsCategorie;
};

module.exports = PostCategorieModel;
