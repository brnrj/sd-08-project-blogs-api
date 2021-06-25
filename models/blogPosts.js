const BlogPosts = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPosts', {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false });

  return blogPosts;
};

BlogPosts.associate = (models) => {
  BlogPosts.belongsTo(models.Users, {
    foreignKey: 'id',
    as: 'userId',
  });
};

module.exports = BlogPosts;