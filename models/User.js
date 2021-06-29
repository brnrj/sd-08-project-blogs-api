const User = (sequelize, DataTypes) => {
  const UserFields = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  return UserFields;
};

module.exports = User;
