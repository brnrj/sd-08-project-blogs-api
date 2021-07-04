const rescue = require('../../utils/rescue');
const PostService = require('../../services/post');

module.exports = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { title, content, categoryIds } = req.body;

  const result = await PostService.update(
    id,
    { title, content, categoryIds },
    userId,
  );

  res.status(200).json(result);
});
