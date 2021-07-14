const blogPosts = (sequelize, DataTypes) => {
  const result = sequelize.define(
    'BlogPosts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      // categoryId: DataTypes.INTEGER,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    { createdAt: 'published', updatedAt: 'updated', timestamps: true },
  );
  result.associate = (models) => {
    result.belongsTo(models.Users, {
      as: 'user',
      foreignKey: 'userId',
    });
  };
  return result;
};

module.exports = blogPosts;
