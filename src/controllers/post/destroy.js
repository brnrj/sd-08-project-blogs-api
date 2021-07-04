const rescue = require('../../utils/rescue');
const PostService = require('../../services/post');

module.exports = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  await PostService.destroy(id, userId);
  res.sendStatus(204);
});
