const User = (sequelize, DataTypes) => {
  const userTb = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  userTb.associate = (models) => {
    userTb.hasMany(models.BlogPost,
      { foreignKey: 'userId', as: 'blogposts' });
  };

  return userTb;
};

module.exports = User;
