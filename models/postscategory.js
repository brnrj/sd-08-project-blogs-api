const PostsCategory = (sequelize, _DataTypes) => {
  const postsCategorySchema = sequelize.define('PostsCategory',
  {},
  { timestamps: false });

  postsCategorySchema.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postsCategorySchema,
      foreignKey: 'id',
      otherKey: 'id',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: postsCategorySchema,
      foreignKey: 'id',
      otherKey: 'id',
    });
  };

  return postsCategorySchema;
};

module.exports = PostsCategory;
