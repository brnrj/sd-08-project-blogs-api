const { BlogPosts, Categories, Users } = require('../models');

const validation = ({ title, content, categoryIds }) => {
if (!title) return '"title" is required';
if (!content) return '"content" is required';
if (!categoryIds) return '"categoryIds" is required';
};

const addPost = async (req, res) => {
  try {
    const data = req.body; // informacoes do body
   const { id: userId } = req.user; // pega o usuario logado no momento pelo valid Token
   const val = await validation(data); // faz a validacao
    if (val) return res.status(400).json({ message: val }); // retorna o erro
  
    const categories = await Categories.findAll(); // pega todas as categorias
    const ids = categories.map(({ dataValues }) => dataValues.id); // retorna um arr com os ids das categorias

    const exist = data.categoryIds.every((id) => ids.includes(id)); // define como false or true se tiver as categorias 
    if (!exist) return res.status(400).json({ message: '"categoryIds" not found' });// joga o erro se nao tiver
  const bla = await BlogPosts.create({ title: data.title, content: data.content, userId }); // cria o post
  return res.status(201).json(bla);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const listPosts = async (req, res) => {
const posts = await BlogPosts.findAll({ include: [ // pega toda a lista dos posts incluindo as infos dos usuarios e categorues mas excluindo o atributo password 
  { model: Users, as: 'user', attributes: { exclude: ['password'] } },
  { model: Categories, as: 'categories', through: { attributes: [] } },
] });
res.status(200).json(posts);
};

module.exports = { addPost, listPosts };