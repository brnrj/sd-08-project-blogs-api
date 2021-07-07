const { BlogPost, PostsCategorie, User, Categorie } = require('../models');

async function getAllPosts() {
  try {
    const allPosts = await BlogPost
      .findAll({
                  include: [
                    { model: User, as: 'user', attributes: { exclude: ['password'] } },
                    { model: Categorie, as: 'categories', through: { attributes: [] } },
                  ],
                })
    .then((posts) => posts);
    return allPosts;
  } catch (err) {
    console.log(err.message);
  }
}

async function createPost(data) {
  try {
    const { categoryIds } = data;
    const post = await BlogPost.create(data);
    const { id } = post.dataValues;

    categoryIds.forEach(async (categoryId) => {
      await PostsCategorie.create({ postId: id, categoryId });
    });

    return post;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { getAllPosts, createPost };
