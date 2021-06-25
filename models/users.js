const Users = (sequelize, DataTypes) => {
  const users = sequelize.define('Users', {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  return users;
};

Users.associate = (models) => {
  Users.hasMany(models.BlogPosts, {
    foreignKey: 'id',
    as: 'userId',
  });
};

module.exports = Users;