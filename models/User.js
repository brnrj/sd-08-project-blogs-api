const Users = (sequelize, DataTypes) => {
  const UsersI = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  UsersI.associate = (models) => {
    UsersI.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'blogPosts',
    });
  };

  return UsersI;
};

module.exports = Users;
