const NxNConfig = {
  blogPostConfig: {
    as: 'categories',
    foreignKey: 'post_id',
    otherKey: 'category_id',
  },
  categoryConfig: {
    as: 'posts',
    foreignKey: 'category_id',
    otherKey: 'post_id',
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