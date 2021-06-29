const PostCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    // id: DataTypes.STRING, // gera automaticamente
    categoryId: DataTypes.STRING,
  });

  return PostCategory;
};

module.exports = PostCategoryModel;
