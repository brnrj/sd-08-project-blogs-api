const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    displayName: {
      type: DataTypes.STRING,
      validate: { len: [7, 200] },
    },
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: { len: [5, 7] },
    },
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Users',
  });

  return user;
};

module.exports = User;
