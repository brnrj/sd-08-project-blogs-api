const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Users',
  });

  user.associate = (models) => {
    user.hasMany(models.BlogPost,
      {
        foreignkey: 'id', as: 'user_id',
      });
  };

  return user;
};

module.exports = User;
