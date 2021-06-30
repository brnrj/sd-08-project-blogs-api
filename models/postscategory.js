const PostCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    // id: DataTypes.STRING, // gera automaticamente
    postId: DataTypes.STRING,
    categoryId: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  return PostCategory;
};

module.exports = PostCategoryModel;
