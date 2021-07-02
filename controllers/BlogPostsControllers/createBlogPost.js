const { createTheNewBlogPost } = require('../../services');

const createBlogPost = async (req, res, _next) => {
  try {
    const { userId } = req.user;
    const { title, content, categoryIds } = req.body;
    const creatingPost = await createTheNewBlogPost({ userId, title, content, categoryIds });
    res.status(201).send(creatingPost);
  } catch (e) {
    console.log(e.message, 'Controllers, createBlogPost.js');
    res.status(500).send(e.message);
  }
};

module.exports = createBlogPost;
