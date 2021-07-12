const { Post: PostModel } = require('../../models');

module.exports = async () => PostModel.findAll({
  include: ['user', 'categories'],
});
