const Category = (sequelize, DataTypes) => {
  const defineUser = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  return defineUser;
};

module.exports = Category;
