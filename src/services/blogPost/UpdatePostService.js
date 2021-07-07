const { BlogPost, Categorie } = require('../../database/models');

module.exports = {
  async execute(id, newData) {
    await BlogPost.update(
      { ...newData },
      { where: { id } },
    );

    const result = await BlogPost.findOne({
      where: { id },
      attributes: { exclude: ['id', 'published', 'updated'] },
      include:
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    });
    return result;
  },
};
