const jwt = require('jsonwebtoken');
const { BlogPost } = require('../models');
const { create } =  require('../services/postServices');

const SECRET = process.env.JWT_SECRET;

const createPost = async (req, res) => {
  const { title, categoryIds, content } = req.body;
  const token = req.headers.authorization;
  const result = await create({ title, categoryIds, content });
  if (result !== true) {
    return res.status(result.status).json({ message: result.message });
  }
  const userId = jwt.verify(token, SECRET).id;
  const createdP = await BlogPost.create({ userId, title, categoryIds, content });
  return res.status(201).json(createdP);
};

const getAllPosts = async (_req, res) => {
  const getAllPosts = await BlogPost.findAll();

  return res.status(200).json(getAllPosts);
};

const getPostById = async (req, res) => {
  const postById = await BlogPost.findByPk(req.params.id);

  if (!postById) return res.status(404).json({ message: 'Produto não encontrado' });

  res.status(201).json(postById);
};

const deletePost = async (req, res) => {
  await BlogPost.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: 'Post removido com sucesso' });
};

const updatePost = async (req, res) => {
  const { } = req.body;

  await BlogPost.update({},
    {
      where: {
        id: req.params.id,
      },
  });

  res.status(200).json({ message: 'Post removido com sucesso' });
};

const searchPost = async (req, res) => {
  const { q } = req.query;
  
  const queryPost = await BlogPost.findAll({
    where: {
      name: {
        [Op.like]: `%${q}`,
      },
    },
  });

  res.status(200).json(queryPost);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};
