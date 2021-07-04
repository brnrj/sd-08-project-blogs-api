const rescue = require('../../utils/rescue');
const PostService = require('../../services/post');

module.exports = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const result = await PostService.findById(id);
  res.status(200).json(result);
});
