const postServices = require('../services/blogpost');

const createPost = (req, res) => {
  const blogPost = req.body;
  const token = req.headers.authorization;

  postServices.createPost(blogPost, token)
    .then((response) => res.status(201).json(response))
    .catch((err) => {
      // if (err.message[0] === '{') return res.status(500).json(err.message);

      const { code, message } = JSON.parse(err.message);
      res.status(code).json({ message });
    });
};

module.exports = {
  createPost,
};