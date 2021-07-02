const Categorie = (sequelize, DataTypes) => {
  const categorie = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  });

  return categorie;
};

module.exports = Categorie;