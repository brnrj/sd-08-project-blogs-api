const Category = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: '"name" is required' },
      },
    },
  }, { timestamps: false });
  return Categories;
};

module.exports = Category;
