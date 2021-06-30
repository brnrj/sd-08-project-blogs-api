const PostsCategories = (sequelize, _DataTypes) => {
  const postsCategosrie = sequelize.define('PostsCategories',
    {},
    { timestamps: false });

  PostsCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categorie',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogPost',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return postsCategosrie;
};

module.exports = PostsCategories;
