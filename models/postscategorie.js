const PostsCategorie = (sequelize, DataTypes) => {
  const postsCategorie = sequelize.define('PostsCategorie', {
    // postId: DataTypes.INTEGER,
    // categoryId: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  });

  postsCategorie.associate = (models) => {
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogPost',
      through: postsCategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });

    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categorie',
      through: postsCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return postsCategorie;
};

module.exports = PostsCategorie;