const Categorie = (sequelize, DataTypes) => {
    const Categories = sequelize.define('Categorie', {
        name: DataTypes.STRING,
    }, { timestamps: false });

    Categories.associate = (models) => {
        Categories.belongsToMany(models.Post, {
          through: 'CategoriesPosts', as: 'posts',
        });
      };

    return Categories;
};

module.exports = Categorie;