const rescue = require('../../utils/rescue');
const PostService = require('../../services/post');

module.exports = rescue(async (_req, res) => {
  const result = await PostService.findAll();
  res.json(result);
});
