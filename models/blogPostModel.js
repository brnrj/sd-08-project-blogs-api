const { Sequelize } = require('sequelize/types');

const defineBlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    // UserId:
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false });
  return BlogPost;
};

module.exports = defineBlogPost;