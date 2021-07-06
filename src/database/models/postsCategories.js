const PostsCategories = (sequelize, _DataTypes) => {
  const postsCategosrie = sequelize.define('PostsCategories',
    {},
    { timestamps: false });

    postsCategosrie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: postsCategosrie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogPost',
      through: postsCategosrie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return postsCategosrie;
};

module.exports = PostsCategories;
