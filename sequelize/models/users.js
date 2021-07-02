const Users = (sequelize, DataTypes) => {
  const users = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });
  users.associate = (models) => {
    users.hasMany(models.BlogPosts, 
      { as: 'blogPost', foreignKey: 'userId' });
  };
  return users;
};

module.exports = Users;