const association = (postsCategories) => {
  const PostsCategories = postsCategories;
  PostsCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      foreignKey: 'postId',
      as: 'categories',
      through: 'PostsCategories',
      otherKey: 'categoryId',
    });

    models.Categories.belongsToMany(models.BlogPosts, {
      foreignKey: 'categoryId',
      as: 'post',
      through: 'PostsCategories',
      otherKey: 'postId',
    });
  };
};

const PostsCategories = (sequelize, DataTypes) => {
  const postsCategories = sequelize.define('PostsCategories', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true },
  }, 
  { timestamps: false });

  association(postsCategories);

  return postsCategories;
};

module.exports = PostsCategories;