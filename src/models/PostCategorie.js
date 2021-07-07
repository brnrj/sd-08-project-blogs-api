const PostsCategorie = (sequelize, _DataTypes) => {
  const PostsCategorieFields = sequelize.define('PostsCategorie', {}, { timestamps: false });
  PostsCategorieFields.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      through: PostsCategorieFields,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories',
    });
    models.Categorie.belongsToMany(models.BlogPost, {
      through: PostsCategorieFields,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return PostsCategorieFields;
};

module.exports = PostsCategorie;
