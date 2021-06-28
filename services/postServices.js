const { Category } = require('../models');

/* req 7
[Será validado que é possível cadastrar um blogpost com sucesso]
[Será validado que não é possível cadastrar um blogpost sem o campo title]
[Será validado que não é possível cadastrar um blogpost sem o campo content]
[Será validado que não é possível cadastrar um blogpost sem o campo categoryIds]
[Será validado que não é possível cadastrar um blogpost com uma categoryIds inexistente]
[Será validado que não é possível cadastrar um blogpost sem o token]
[Será validado que não é possível cadastrar um blogpost com o token inválido]
*/
const postagem = {
  postagemCriada: { message: 'Post Created', status: 201 },
  tituloRequerido: { message: '"title" is required', status: 400 },
  conteudoRequerido: { message: '"content" is required', status: 400 },
  categoryRequerida: { message: '"categoryIds" is required', status: 400 },
  categoriesNaoEncontradas: { message: '"categoryIds" not found', status: 400 },
};

const validEntrie = (myValue, object) => {
  if (myValue === undefined || myValue === null) return object;
  return true;
};

const validCategory = async (categories) => {
  const { categoriesNaoEncontradas } = postagem;

  const dbCategories = await Category.findAll();
  const mapedCategory = dbCategories.map((cat) => cat.id);
  let existsCategory = true
  categories.map((e) => {
      existsCategory = mapedCategory.includes(e);
  });
  if (!existsCategory) return categoriesNaoEncontradas;
  
  return true;
};

const create = ({ title, categoryIds, content }) => {
  
  const { tituloRequerido, conteudoRequerido, categoryRequerida } = postagem;
  if (validEntrie(title, tituloRequerido) !== true) return validEntrie(title, tituloRequerido);
  if (validEntrie(categoryIds, categoryRequerida) !== true) return validEntrie(categoryIds, categoryRequerida);
  if (validEntrie(content, conteudoRequerido) !== true) return validEntrie(content, conteudoRequerido);
  if (validCategory(categoryIds) !== true) return validCategory(categoryIds);
  return true;
};

/* req 8
[Será validado que é possível listar blogpost com sucesso]
[Será validado que não é possível listar blogpost sem token]
[Será validado que não é possível listar blogpost com token inválido]
*/
const listaPostagens = {
  postagemlistada: { message: 'Post listed', status: 200 },
  tokenInexistente: { message: 'Token not found', status: 401 },
  tokenExpirado: { message: 'Expired or invalid token', status: 401 },
};

/* req 9
[Será validado que é possível listar um blogpost com sucesso]
[Será validado que não é possível listar um blogpost sem token]
[Será validado que não é possível listar um blogpost com token inválido]
[Será validado que não é possível listar um blogpost inexistente]
*/
const listaPostagem = {
  postagemlistada: { message: 'Post listed', status: 200 },
  postInexistente: { message: 'Post does not exist', status: 404 },
  tokenInexistente: { message: 'Token not found', status: 401 },
  tokenExpirado: { message: 'Expired or invalid token', status: 401 },
};

/* req 10
[Será validado que é possível editar um blogpost com sucesso]
[Será validado que não é possível editar as categorias de um blogpost]
[Será validado que não é possível editar um blogpost com outro usuário]
[Será validado que não possível editar um blogpost sem token]
[Será validado que não possível editar um blogpost com token inválido]
[Será validado que não possível editar um blogpost sem o campo title]
[Será validado que não possível editar um blogpost sem o campo content]
*/
const atualizaPostagem = {
  postagemAtualizada: { message: 'Post updated', status: 200 },
  postInexistente: { message: 'Post does not exist', status: 404 },
  tituloRequerido: { message: '"title" is required', status: 400 },
  conteudoRequerido: { message: '"content" is required', status: 400 },
  categoriasNaoEdita: { message: 'Categories cannot be edited', status: 400 },
  usuarioDesautorizado: { message: 'Unauthorized user', status: 401 },
  tokenInexistente: { message: 'Token not found', status: 401 },
  tokenExpirado: { message: 'Expired or invalid token', status: 401 },
};

/* req 11
[Será validado que não é possível deletar um blogpost com outro usuário]
[Será validado que não é possível deletar um blogpost inexistente]
[Será validado que não é possível deletar um blogpost sem o token]
[Será validado que não é possível deletar um blogpost com o token inválido]
*/
const deletar = {
  postagemAtualizada: { message: 'Post deleted', status: 204 },
  postInexistente: { message: 'Post does not exist', status: 404 },
  usuarioDesautorizado: { message: 'Unauthorized user', status: 401 },
  tokenInexistente: { message: 'Token not found', status: 401 },
  tokenExpirado: { message: 'Expired or invalid token', status: 401 },
};

/* re1 13
[Será validado que é possível buscar um blogpost pelo title]
[Será validado que é possível buscar um blogpost pelo content]
[Será validado que é possível buscar todos os blogpost quando passa a busca vazia']
[Será validado que é possível buscar um blogpost inexistente e retornar array vazio]
[Será validado que não é possível buscar um blogpost sem o token]
[Será validado que não é possível buscar um blogpost com o token inválido]
*/
const pesquisa = {
  pesquisaRealizada: { message: 'Query realized', status: 204 },
  tokenInexistente: { message: 'Token not found', status: 401 },
  tokenExpirado: { message: 'Expired or invalid token', status: 401 },
};

module.exports = {
  create,
};