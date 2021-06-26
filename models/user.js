const User = (sequelize, DataTypes) => {
  const userSchema = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
    underscored: true,
  });

  userSchema.associate = (models) => {
    userSchema.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'blog_posts' });
  };

  return userSchema;
};

module.exports = User;
