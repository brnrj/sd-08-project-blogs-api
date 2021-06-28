const postServices = require('../services/blogpost');

const createPost = (req, res) => {
  const blogPost = req.body;
  const token = req.headers.authorization;

  postServices.createPost(blogPost, token)
    .then((response) => res.json(response))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err.message);
    });
};

module.exports = {
  createPost,
};