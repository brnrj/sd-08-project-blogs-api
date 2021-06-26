module.exports = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define('PostCategories',
  {
    categoryId: { type: DataTypes.INTEGER, primaryKey: true },
    postId: { type: DataTypes.INTEGER, primareyKey: true },
  }, { timestamps: false });
  PostCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, { as: 'categories',
      through: PostCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categories.belongsToMany(models.BlogPosts, { as: 'blogPosts',
        through: PostCategories,
        foreignKey: 'categoryId',
        otherKey: 'postId',
    });
  };      
    return PostCategories;
};

// Seguindo o conteúdo do course o lint reclamava. Solução encontrada no PR:
// https://github.com/tryber/sd-07-project-blogs-api/blob/thadeucbr-07-project-blogs-api/models/PostsCategories.js
