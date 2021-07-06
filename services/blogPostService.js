const { BlogPost, Category, User } = require('../models');

const validarPost = async (title, content, categoryIds) => {
  if (title === undefined) {
    throw new Error('"title" is required');
  }
  if (content === undefined) {
    throw new Error('"content" is required');
  }
  if (categoryIds === undefined) {
    throw new Error('"categoryIds" is required');
  }
};

const buscarTodasCategoriasId = async (categoryIds) => {
  const categorias = await Category.findAll();
  const categoriasIds = categorias.map((categoria) => categoria.id);
  const categoria = categoryIds.every((categoriaId) => categoriasIds.includes(categoriaId));
  return categoria;
};

const criarBlogPost = async (title, content, categoryIds, userId) => {
  await validarPost(title, content, categoryIds);
  const validarBuscaCategorias = await buscarTodasCategoriasId(categoryIds); 
  if (!validarBuscaCategorias) {
    throw new Error('"categoryIds" not found');
  }
  const novoBlogPost = await BlogPost.create(
    { title, content, userId, published: Date.now(), updated: Date.now() },
);
  return novoBlogPost;
};

const buscarTodosPosts = async () => {
  const posts = await BlogPost.findAll({ include: [
    { model: User, as: 'user', attributes: { excludes: ['password'] } },
    { model: Category, as: 'categories' },
  ] });
  return posts;
};

module.exports = {
  criarBlogPost,
  buscarTodosPosts,
};