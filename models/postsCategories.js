const PostsCategories = (sequelize, DataTypes) => {
    const postsCategories = sequelize.define('PostsCategories', {
        postId: { type: DataTypes.INTEGER, foreignKey: true },
        categoryId: { type: DataTypes.INTEGER, foreignKey: true },
    }, { timestamps: false });
    postsCategories.associate = (models) => {
        postsCategories
            .belongsTo(models.Categories, { foreignKey: 'categoryId' });
        postsCategories.belongsTo(models.BlogPosts, { foreignKey: 'postId' });
        // postsCategories
        //    .belongsToMany(models.Users, { through: models.BlogPosts, as: 'user', foreignKey: 'userId' });
    };
    return postsCategories;
};

module.exports = PostsCategories;