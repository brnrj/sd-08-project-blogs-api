const definePostCategoryModel = (sequelize, DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory', {
    type: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, { timestamps: false });

  return PostsCategory;
};

module.exports = definePostCategoryModel;
