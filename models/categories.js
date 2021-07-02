const Categorie = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  return Categories;
};

module.exports = Categorie;