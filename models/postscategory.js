const PostsCategory = (sequelize, _DataTypes) => {
  const postsCategorySchema = sequelize.define('PostsCategory',
  {},
  { timestamps: false });

  postsCategorySchema.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postsCategorySchema,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: postsCategorySchema,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postsCategorySchema;
};

module.exports = PostsCategory;
