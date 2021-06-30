const Post = (sequelize, DataTypes) => {
    const Posts = sequelize.define('Post', {
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        categoryIds: DataTypes.INTEGER,
    }, { timestamps: false });

    Posts.associate = (models) => {
        Posts.belongsTo(models.User, { as: 'user' });
    
        Posts.belongsToMany(models.Categorie, {
          through: 'CategoriesPosts',
          as: 'categories',
        });
    };

    return Posts;
};

module.exports = Post;