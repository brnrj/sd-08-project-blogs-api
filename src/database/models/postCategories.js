const sequelize = require('../index');

const PostsCategories = sequelize.define('PostsCategories', {}, { timestamps: false });

PostsCategories.associate = (models) => {
  models.BlogPost
    .belongsToMany(models.Category, {
      as: 'categories', through: PostsCategories, foreignKey: 'postId', otherkey: 'categoryId',
  });
  models.Category.belongsToMany(models.BlogPost, {
    as: 'posts', through: PostsCategories, foreignKey: 'categoryId', otherkey: 'postId',
  });
};

module.exports = PostsCategories;
