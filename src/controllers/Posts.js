const { BlogPosts, Users, Categories } = require('../database/models');
const {
  tokenValidator,
  titleValidator,
  contentValidator,
  categoryIdsValidator,
  decodeToken,
} = require('../utils/helpers');
const {
  UnauthorizedUserError,
  PostDoesNotExistsError,
  CannotEditFieldError,
} = require('../utils/errors');

module.exports = {
  async create(request, response) {
    try {
      const { authorization } = request.headers;
      const { title, categoryIds, content, categories } = request.body;
      tokenValidator(authorization);
      titleValidator(title);
      contentValidator(content);
      await categoryIdsValidator(categoryIds);
      const id = decodeToken(authorization);
      const post = await BlogPosts.create({ title, content, userId: Number(id) });
      if (categories && categories.length > 0) await BlogPosts.setCategories(categories);
      return response.status(201).send(post);
    } catch (err) {
      console.error(`${err.name}`, `${err.message}`);
      return response.status(err.statusCode).send({ message: err.message });
    }
  },

  async index(request, response) {
    try {
      const { authorization } = request.headers;
      tokenValidator(authorization);
      const posts = await BlogPosts.findAll({
        include: [
          { model: Users, as: 'user' },
          { model: Categories, as: 'categories', through: { attributes: [] } },
        ],
      });
      return response.status(200).send(posts);
    } catch (err) {
      console.error(`${err.name}`, `${err.message}`);
      return response.status(err.statusCode).send({ message: err.message });
    }
  },

  async show(request, response) {
    try {
      const { authorization } = request.headers;
      const { id } = request.params;
      tokenValidator(authorization);
      const post = await BlogPosts.findByPk(id, {
        include: [
          { model: Users, as: 'user' },
          { model: Categories, as: 'categories', through: { attributes: [] } },
        ],
      });
      if (!post) throw new PostDoesNotExistsError();
      return response.status(200).send(post);
    } catch (err) {
      console.error(`${err.name}`, `${err.message}`);
      return response.status(err.statusCode).send({ message: err.message });
    }
  },

  async update(request, response) {
    try {
      const { authorization } = request.headers;
      const { id } = request.params;
      const { title, content, categoryIds } = request.body;
      tokenValidator(authorization);
      const decodedUserId = decodeToken(authorization);
      const post = await BlogPosts.findByPk(id, { include:
        [{ model: Categories, as: 'categories', through: { attributes: [] } }] });
      if (post.userId !== Number(decodedUserId)) throw new UnauthorizedUserError();
      titleValidator(title);
      contentValidator(content);
      if (categoryIds) throw new CannotEditFieldError('Categories');
      post.title = title;
      post.content = content;
      return response.status(200).send(await post.save());
    } catch (err) {
      return response.status(err.statusCode).send({ message: err.message });
    }
  },

  async delete(request, response) {
    try {
      const { authorization } = request.headers;
      const { id } = request.params;
      tokenValidator(authorization);
      const decodedUserId = decodeToken(authorization);
      const post = await BlogPosts.findByPk(id);
      if (!post) throw new PostDoesNotExistsError();
      if (post.userId !== Number(decodedUserId)) throw new UnauthorizedUserError();
      await BlogPosts.destroy({ where: { id } });
      return response.status(204).send();
    } catch (err) {
      console.error(`${err.name}`, `${err.message}`);
      return response.status(err.statusCode).send({ message: err.message });
    }
  },
};