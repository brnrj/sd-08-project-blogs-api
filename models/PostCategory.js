const NxNConfig = {
  blogPostConfig: {
    as: 'categories',
    foreignKey: 'postId',
    otherKey: 'categoryId',
  },
  categoryConfig: {
    as: 'posts',
    foreignKey: 'categoryId',
    otherKey: 'postId',
  },
};

module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {}, {
    timestamps: false,
    tableName: 'PostsCategories',
  });

  PostCategory.associate = (models) => {
    const { blogPostConfig, categoryConfig } = NxNConfig;
    models.BlogPost.belongsToMany(models.Category, { ...blogPostConfig, through: PostCategory });
    models.Category.belongsToMany(models.BlogPost, { ...categoryConfig, through: PostCategory });
  };

  return PostCategory;
};