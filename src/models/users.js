const Users = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('Users', {
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
      { foreignKey: 'userId', as: 'blogposts' });
  };
  return UserTable;
};

module.exports = Users;