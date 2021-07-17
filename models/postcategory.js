const PostsCategory = (sequelize, _DataTypes) => {
  const postsCategoryTb = sequelize.define('PostsCategory', {},
  { timestamps: false });
  postsCategoryTb.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categories, {
      as: 'categories',
      through: postsCategoryTb,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categories.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: postsCategoryTb,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return postsCategoryTb;
};

module.exports = PostsCategory;
