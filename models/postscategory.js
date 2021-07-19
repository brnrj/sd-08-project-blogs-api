const PostsCategory = (sequelize, DataTypes) => {
  const postsCategory = sequelize.define(
    'PostsCategory',
    {
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    { timestamps: false },
  );

  return postsCategory;
};

PostsCategory.associate = (models) => {
  models.blogpost.belongsToMany(
    models.category,
    {
      as: 'categories',
      through: PostsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    },
  );
  models.category.belongsToMany(
    models.blogpost,
    {
      as: 'blogPosts',
      through: PostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    },
  );
};

module.exports = PostsCategory;
