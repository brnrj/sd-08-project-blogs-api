const Categories = (sequelize, DataTypes) => {
    const categories = sequelize.define('Categories', {
        name: DataTypes.STRING,
    }, { timestamps: false });

    // categories.associate = (models) => {
    //     categories.hasOne(models.PostsCategories, { foreignKey: 'categoryId' });
    //     };

    return categories;
};

module.exports = Categories;