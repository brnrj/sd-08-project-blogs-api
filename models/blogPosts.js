function afterCreate() {
  return (blogPost, options) => {
    const { transaction } = options;
    const { id: postId, categoryIds } = blogPost;
    const promiseArray = categoryIds.map((categoryId) => 
      blogPost.sequelize.models.PostsCategories.create({ postId, categoryId }, { transaction }));
    return Promise.all(promiseArray);
  };
}

function filterInfo() {
  const { id, userId, title, content } = this;
  return {
    id, userId, title, content,
  };
}

const BlogPosts = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
    categoryIds: DataTypes.VIRTUAL,
  }, { 
    timestamps: false,
    // https://sequelize.org/v5/manual/hooks.html
    hooks: {
      afterCreate: afterCreate(),
    },
  });

  blogPosts.prototype.filterInfo = filterInfo;

  return blogPosts;
};

BlogPosts.associate = (models) => {
  BlogPosts.belongsTo(models.Users, {
    foreignKey: 'id',
    as: 'userId',
  });
};

module.exports = BlogPosts;