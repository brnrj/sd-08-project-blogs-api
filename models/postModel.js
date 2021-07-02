const Post = (sequelize, DataTypes) => {
  const PostTable = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
  });

  PostTable.associate = (models) => {
    PostTable.belongsTo(models.User,
      {
        foreignkey: 'userId', as: 'user',
      });
    // PostTable.belongsToMany(models.Category, {
    //     as: 'categories',
    //     through: 'PostCategory',
    //     foreignKey: 'postId',
    //     // otherKey: 'categoryId',
    //   });
  };

  return PostTable;
};

module.exports = Post;
