const blogPostService = require('../services/blogPostService');

const httpStatusCodeSucess = 200;
const httpStatusCodeCreated = 201;
const httpStatusCodeBadRequest = 400;
const httpStatusCodeUnauthorized = 401;

const criarBlogPost = async (req, res) => {
  try {      
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    const novoBlog = await blogPostService.criarBlogPost(title, content, categoryIds, id);
    return res.status(httpStatusCodeCreated).json(novoBlog);
  } catch (err) {
    return res.status(httpStatusCodeBadRequest).json({
      message: err.message,
    });
  }
};

const buscarTodosPosts = async (req, res) => {
  try {
    const posts = await blogPostService.buscarTodosPosts();
    return res.status(httpStatusCodeSucess).json(posts);
  } catch (err) {
    return res.status(httpStatusCodeUnauthorized).json({
      message: err.message,
    });
  }
};

module.exports = { criarBlogPost, buscarTodosPosts };