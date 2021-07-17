const PostService = require('../../services/post');
const { errorHandling, customError } = require('../../utils');

module.exports = errorHandling(async (req, res, next) => {
  const { id } = req.params;

  const result = await PostService.findById(id);

  if (result.err) return next(customError('Post does not exist', 'notFound'));

  res.status(200).json(result);
});
