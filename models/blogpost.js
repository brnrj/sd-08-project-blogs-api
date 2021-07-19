const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define(
    'BlogPost',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    { timestamps: false },
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
