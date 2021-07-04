const PostService = require('../services/postService');

const SERVER_ERROR = 500;
const OK = 200;
const CREATED = 201;

const addPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const user = req.user.data;
    const { userId, id } = await PostService.addPost(title, content, user);
    await PostService.addPostCategories(id, categoryIds);
    return res.status(CREATED).json({ id, userId, title, content });
  } catch (err) {
    res.status(SERVER_ERROR).json({ message: 'Erro brabo' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const results = await PostService.getAllPosts();
    return res.status(OK).json(results);
  } catch (err) {
    console.log(err);
    res.status(SERVER_ERROR).json({ message: 'Erro brabo' });
  }
};

module.exports = {
  addPost,
  getAllPosts,
};