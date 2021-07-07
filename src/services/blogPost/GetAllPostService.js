const { User, BlogPost, Categorie } = require('../../database/models');

module.exports = {
  async execute() {
    const posts = await BlogPost
      .findAll({
        include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Categorie, as: 'categories', through: { attributes: [] } },
        ],
      });

    return posts;
  },
};
