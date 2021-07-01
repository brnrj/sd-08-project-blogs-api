const Categorie = (sequelize, DataTypes) => {
  const categorieFields = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  return categorieFields;
};

module.exports = Categorie;
