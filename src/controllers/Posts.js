const Post = require('../database/models/BlogPosts');
const {
  tokenValidator,
  titleValidator,
  contentValidator,
  categoryIdsValidator,
  decodeToken,
} = require('../utils/helpers');

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
};