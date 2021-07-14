const postCategories = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories', {},
  {
    timestamps: false,
  });

  return PostsCategories;
};

module.exports = postCategories;
