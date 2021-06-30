const Category = (sequelize, DataTypes) => {
  const CategoryTable = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  // CategoryTable.associate = (models) => {
  //   CategoryTable.hasMany(models.Post,
  //     {
  //       foreignkey: 'userId', as: 'user',
  //     });
  // };

  return CategoryTable;
};

module.exports = Category;
