const User = (sequelize, DataTypes) => {
  const UserData = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  return UserData;
};

module.exports = User;
