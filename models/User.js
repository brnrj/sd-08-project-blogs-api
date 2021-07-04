// const { Post } = require('./index');

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

  UserFields.associate = (models) => {
    UserFields.hasMany(models.BlogPost); 
};
  return UserFields;
};

module.exports = User;
