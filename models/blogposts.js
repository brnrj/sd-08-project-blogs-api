const BlogPostsModel = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    // id: DataTypes.STRING, // gera automaticamente
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true }, // A declaração da Foreign Key é opcional no model
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false });
  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user', onDelete: 'CASCADE', onUpdate: 'CASCADE',
    });
    BlogPosts.belongsToMany(models.Category, {
      foreignKey: 'categoryId',
      through: 'PostsCategories',
      as: 'categories',
    });
  };
  return BlogPosts;
};

module.exports = BlogPostsModel;
