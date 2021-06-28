const rescue = require('../../utils/rescue');
const PostService = require('../../services/post');

module.exports = rescue(async (req, res) => {
  const result = await PostService.findAll();
  res.json(result);
});
