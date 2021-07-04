module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories', {}, { timestamps: false });

  PostsCategories.associate = (models) => {
    models.BlogPost
      .belongsToMany(models.Category, {
        as: 'posts', through: PostsCategories, foreignKey: 'postId', otherkey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'categories', through: PostsCategories, foreignKey: 'categoryId', otherkey: 'postId',
    });
  };
  return PostsCategories;
};