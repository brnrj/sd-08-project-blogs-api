const CategorieModel = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  return Categorie;
};

module.exports = CategorieModel;