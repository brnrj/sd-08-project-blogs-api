module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: { type: DataTypes.INTEGER, primaryKey: true, field: 'id' },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Users',
  });

  return User;
};