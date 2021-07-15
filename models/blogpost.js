const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define(
    'BlogPost',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    },
  );

  return blogPost;
};

BlogPost.associate = (models) => {
  BlogPost.belongsTo(
    models.user,
    {
      foreignKey: 'userId',
      as: 'user',
    },
  );
};

module.exports = BlogPost;