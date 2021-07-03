const BlogPostsModel = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    // id: DataTypes.STRING, // gera automaticamente
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true }, // A declaração da Foreign Key é opcional no model
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
    //  createdAt: 'published', updatedAt: 'updated',
  });
  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User, {
      foreignKey: 'userId', as: 'users', onDelete: 'CASCADE', onUpdate: 'CASCADE',
    });
    BlogPosts.belongsToMany(models.Category, {
      through: 'PostsCategories', as: 'categories',
    });
  };
  return BlogPosts;
};

module.exports = BlogPostsModel;
