const { Op } = require('sequelize');
const { Post } = require('../../database/models');

module.exports = async (searchTerm) => Post.findAll({
  where: {
    [Op.or]: [
      { title: { [Op.like]: `%${searchTerm}%` } },
      { content: { [Op.like]: `%${searchTerm}%` } },
    ],
  },
  include: ['user', 'categories'],
});
