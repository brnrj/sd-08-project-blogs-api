const PostService = require('../../services/post');
const { errorHandling } = require('../../utils');

module.exports = errorHandling(async (req, res) => {
  const result = await PostService.findAll();

  res.json(result);
});
