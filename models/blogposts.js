module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define(
    'BlogPosts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.STRING,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    }, { timestamps: true, createdAt: 'published', updatedAt: 'updated' },
  );

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users);
    BlogPosts.belongsToMany(models.Categories, {
      through: 'PostCategories',
      foreignKey: 'postId',
    });
  };

  return BlogPosts;
};
