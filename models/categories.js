const categoriesMethods = (sequelize, DataTypes) => {
  const result = sequelize.define(
    'Categories',
    {
      name: DataTypes.STRING,
    },
    { timestamps: false },
  );
  
  return result;
};

module.exports = categoriesMethods;
