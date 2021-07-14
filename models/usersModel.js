const usersMethods = (sequelize, DataTypes) => {
  const result = sequelize.define(
    'Users',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    { timestamps: false },
  );

  result.associate = (models) => {
    result.hasMany(models.BlogPosts, {
      foreignKey: 'userId',
    });
  };

  return result;
};

module.exports = usersMethods;
