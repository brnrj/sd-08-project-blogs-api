const PostCategoryModel = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {}, // postId e CategoryId, mas tabela intermediária não tem atributo
    { timestamps: false });
  PostCategoryModel.associate = (models) => {
    models.Category.belongsToMany(models.BlogPosts, {
      as: 'blogposts',
      through: PostCategory,
      foreignKey: 'id',
      otherKey: 'id',
    });
    models.BlogPosts.belongsToMany(models.Category, {
      as: 'category',
      through: PostCategory,
      foreignKey: 'id',
      otherKey: 'id',
    });
  };

  return PostCategory;
};

module.exports = PostCategoryModel;
