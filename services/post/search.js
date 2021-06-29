const { Op } = require('sequelize');
const { Post: PostModel } = require('../../models');

module.exports = async (searchTerm) => PostModel.findAll({
  where: {
    [Op.or]: [
      { title: { [Op.like]: `%${searchTerm}%` } },
      { content: { [Op.like]: `%${searchTerm}%` } },
    ],
  },
  include: ['user', 'categories'],
});
