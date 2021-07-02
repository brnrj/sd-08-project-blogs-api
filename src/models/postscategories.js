const PostsCategories = (sequelize, _DataTypes) => {
  const postsCategosrie = sequelize.define('PostsCategories',
    {},
    { timestamps: false });

    postsCategosrie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categories, {
      as: 'categories',
      through: postsCategosrie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categories.belongsToMany(models.BlogPost, {
      as: 'blogPost',
      through: postsCategosrie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return postsCategosrie;
};

module.exports = PostsCategories;
