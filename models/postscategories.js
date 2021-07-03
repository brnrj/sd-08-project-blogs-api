module.exports = (sequelize, _DataTypes) => {
    const PostsCategories = sequelize.define('PostsCategorie', 
    {}, { timestamps: false });

    PostsCategories.associate = (models) => {
      models.BlogPost.belongsToMany(models.Categorie, {
        as: 'categories',
        through: PostsCategories,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });

      models.Categorie.belongsToMany(models.BlogPost, {
        as: 'blogposts',
        through: PostsCategories,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });
    };
    return PostsCategories;
};