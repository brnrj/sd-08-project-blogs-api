const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignkey: true },
    published: 'TIMESTAMP',
    updated: 'TIMESTAMP',
  },
  {
    timestamps: false,
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, 
      {
        foreignkey: 'userId', as: 'user',
      });
  };

  return blogPost;
};

module.exports = BlogPost;