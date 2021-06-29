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
    const { code, message } = JSON.parse(err.message);
    res.status(code).json({ message });
  });
};

const getPostById = (req, res) => {
  const { id } = req.params;

  postServices.getPostById(id)
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      console.log(err);

      res.status(400).json(err.message);

      // const { code, message } = JSON.parse(err.message);
      // res.status(code).json({ message });
    });
};

const updatePostById = (req, res) => {
  const newPost = req.body;
  const { id } = req.params;
  const token = req.headers.authorization;

  postServices.updatePostById(id, token, newPost)
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      console.log(err, 'update');

      const { code, message } = JSON.parse(err.message);
      res.status(code).json({ message });
    });
};

const deletePostById = (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  postServices.deletePostById(id, token)
  .then(() => res.status(204).json())
  .catch((err) => {
    console.log(err, 'delete');

    const { code, message } = JSON.parse(err.message);
    res.status(code).json({ message });
  });
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePostById,
};