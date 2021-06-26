const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    fullName: DataTypes.STRING,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  
  user.associate = (models) => {
    user.hasMany(models.Post,
      { foreignKey: 'userId', as: 'posts' });
  };

  return user;
};

module.exports = User;