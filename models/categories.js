const Categories = (sequelize, DataTypes) => {
  const categorieTb = sequelize.define('Categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  return categorieTb;
};

module.exports = Categories;
