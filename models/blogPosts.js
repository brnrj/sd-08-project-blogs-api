const BlogPosts = (sequelize, DataTypes) => {
    const blogPosts = sequelize.define('BlogPosts', {
        userId: { type: DataTypes.INTEGER, foreignKey: true },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
    }, { timestamps: false });
    blogPosts.associate = (models) => {
       blogPosts.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' }); 
    //    blogPosts.hasOne(models.PostsCategories, { foreignKey: 'postId' });
       blogPosts
          .belongsToMany(
              models.Categories, 
              { through: models.PostsCategories, as: 'categories', foreignKey: 'categoryId', 
            },
            );
    };
    return blogPosts;
};

module.exports = BlogPosts;