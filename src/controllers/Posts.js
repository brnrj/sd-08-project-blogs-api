const Post = require('../database/models/BlogPosts');
const {
  tokenValidator,
  titleValidator,
  contentValidator,
  categoryIdsValidator,
  decodeToken,
} = require('../utils/helpers');
const { UnauthorizedUserError, PostDoesNotExistsError } = require('../utils/errors');

module.exports = {
  async create(request, response) {
    try {
      const { authorization } = request.headers;
      const { title, categoryIds, content } = request.body;
      tokenValidator(authorization);
      titleValidator(title);
      contentValidator(content);
      await categoryIdsValidator(categoryIds);
      const id = decodeToken(authorization);
      const post = await Post.create({ title, content, userId: Number(id) });
      return response.status(201).send(post);
    } catch (err) {
      console.error(`${err.name}`, `${err.message}`);
      return response.status(err.statusCode).send({ message: err.message });
    }
  },

  async delete(request, response) {
    try {
      const { authorization } = request.headers;
      const { id } = request.params;
      tokenValidator(authorization);
      const decodedUserId = decodeToken(authorization);
      const post = await Post.findByPk(id);
      if (!post) throw new PostDoesNotExistsError();
      if (post.userId !== Number(decodedUserId)) throw new UnauthorizedUserError();
      await Post.destroy({ where: { id } });
      return response.status(204).send();
    } catch (err) {
      console.error(`${err.name}`, `${err.message}`);
      return response.status(err.statusCode).send({ message: err.message });
    }
  },
};