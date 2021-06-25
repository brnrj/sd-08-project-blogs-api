const Users = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('Users', {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });
  return UserTable;
};

module.exports = Users;