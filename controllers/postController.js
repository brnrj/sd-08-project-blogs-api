const Op = require('sequelize');
const { BlogPost } = require('../models');

const createPost = async (req, res) => {
  const { displayedName, email, password, image } = req.body;
  const createPost = await BlogPost.create({ displayedName, email, password, image });
  
  res.status(200).json(createPost);
};

const getAllPosts = async (_req, res) => {
  const getAllPosts = await BlogPost.findAll();

  res.status(200).json(getAllPosts);
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
