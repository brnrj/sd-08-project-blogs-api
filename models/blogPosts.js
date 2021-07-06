const BlogPosts = (sequelize, DataTypes) => {
    const blogPosts = sequelize.define('BlogPosts', {
        userId: { type: DataTypes.INTEGER, foreignKey: true },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
    }, { timestamps: false });
    blogPosts.associate = (models) => {
       blogPosts.belongsTo(models.Users, { foreignKey: 'userId', as: 'author' }); 
    };
    return blogPosts;
};

module.exports = BlogPosts;