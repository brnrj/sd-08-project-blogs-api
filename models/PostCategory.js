const optionalAssociate = (PostCategory) => (models) => {
  models.Category.belongsToMany(models.BlogPost, {
    as: 'blogPosts',
    through: PostCategory,
    foreignKey: 'categoryId',
    otherKey: 'postId',
  });
  models.BlogPost.belongsToMany(models.Category, {
    as: 'categories',
    through: PostCategory,
    foreignKey: 'postId',
    otherKey: 'categoryId',
  });
};

module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {},
  {
    tableName: 'PostsCategories',
    timestamps: false,
  });

  PostCategory.associate = optionalAssociate(PostCategory);

  return PostCategory;
}; 