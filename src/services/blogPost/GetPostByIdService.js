const { User, BlogPost, Categorie } = require('../../database/models');

module.exports = {
  async execute({ id }) {
    const post = await BlogPost
      .findAll({
        where: { id },
        include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Categorie, as: 'categories', through: { attributes: [] } },
        ],
      });

    if (post.length === 0) return false;

    return post;
  },
};
