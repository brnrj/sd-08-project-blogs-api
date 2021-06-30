const Users = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    },
    {
      timestamps: false,
    });
  Users.associate = (models) => {
    Users.hasMany(models.BlogPosts,
      { as: 'blogposts' });
  };
  return UserTable;
};

module.exports = Users;