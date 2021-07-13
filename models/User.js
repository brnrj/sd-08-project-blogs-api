const validateName = {
  isLength: { min: 8, msg: '"displayName" length must be at least 8 characters long' },
};

const validateEmail = {
  isEmail: { msg: '"email" must be a valid email' },
  notNull: { msg: '"email" is required' },
};

const validatePassword = {
  notNull: { msg: '"password" is required' },
  len: { min: 6, msg: '"password" length must be 6 characters long' },
};

const User = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    displayName: { type: DataTypes.STRING, allowNull: false, validate: validateName },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'User already registered' },
      validate: validateEmail,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: validatePassword,
    },
    image: DataTypes.STRING,
  }, { timestamps: false });
  return Users;
};

module.exports = User;
