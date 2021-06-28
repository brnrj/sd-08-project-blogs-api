const postServices = require('../services/blogpost');

const createPost = (req, res) => {
  const blogPost = req.body;
  const token = req.headers.authorization;

  postServices.createPost(blogPost, token)
    .then((response) => res.status(201).json(response))
    .catch((err) => {
      const { code, message } = JSON.parse(err.message);
      res.status(code).json({ message });
    });
};

const getPosts = (req, res) => {
  postServices.getPosts()
  .then((response) => res.status(200).json(response))
  .catch((err) => {
    console.log(err);

    const { code, message } = JSON.parse(err.message);
    res.status(code).json({ message });
  });
};

module.exports = {
  createPost,
  getPosts,
};