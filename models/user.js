const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // id: DataTypes.STRING, // gera automaticamente
    displayName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      // unique: true, // desfeito porque ao esbarrar, joga erro do próprio sequelize. Mais fácil fazer pelo express
    }, // email tem quer ser único
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  User.associate = (models) => {
    User.hasMany(models.BlogPosts, {
      foreignKey: 'userId', as: 'blogposts', onDelete: 'CASCADE', onUpdate: 'CASCADE',
    });
  };
  return User;
};

module.exports = UserModel;
