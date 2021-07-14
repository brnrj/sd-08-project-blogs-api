const blogPosts = (sequelize, DataTypes) => {
  const result = sequelize.define(
    'BlogPosts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
    },
    { createdAt: 'published', updatedAt: 'updated', timestamps: true },
  );
  result.associate = (models) => {
    result.belongsToMany(models.Categories, {
      through: 'PostsCategories',
      as: 'categories',
      foreignKey: 'postId',
      timestamps: false,
    });
  };
  return result;
};

module.exports = blogPosts;
