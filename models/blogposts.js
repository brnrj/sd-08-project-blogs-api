const BlogPost = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignkey: true },
    published: 'TIMESTAMP',
    updated: 'TIMESTAMP',
  },
  {
    timestamps: false,
  });

  blogPosts.associate = (models) => {
    blogPosts.belongsTo(models.User,
      {
        foreignkey: 'userId', as: 'users',
      });
  };

  return blogPosts;
};

module.exports = BlogPost;
