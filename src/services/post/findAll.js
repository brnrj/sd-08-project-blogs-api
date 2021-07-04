const { Post } = require('../../database/models');

module.exports = async () => Post.findAll({
  include: ['user', 'categories'],
});
