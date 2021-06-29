const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // id: DataTypes.STRING, // gera automaticamente
    displayName: DataTypes.STRING,
    email: DataTypes.STRING, // tem quer ser único
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  return User;
};

module.exports = UserModel;
