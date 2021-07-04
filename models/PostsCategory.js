const PostsCategories = (sequelize, _DataTypes) => {
  const PostsCateg = sequelize.define('PostsCategory', 
    {
    // postId: { type: DataTypes.INTEGER, foreignKey: true },
    // categoryId: { type: DataTypes.INTEGER, foreignKey: true },
    }, 
    { timestamps: false });

  PostsCateg.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: PostsCateg,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      through: PostsCateg,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return PostsCateg;
};

module.exports = PostsCategories;
