const Categorie = (sequelize, DataTypes) => {
  const CategorieData = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  });

  return CategorieData;
};

module.exports = Categorie;
