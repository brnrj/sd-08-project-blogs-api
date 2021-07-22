const definePostCategoriesModel = (sequelize, Datatypes) => {
  const PostsCategories = sequelize.define('PostsCategories', {},
  { timestamps: false });
  
  PostsCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'category',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPost',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
};

module.exports = definePostCategoriesModel;