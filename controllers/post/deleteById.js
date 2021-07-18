const PostService = require('../../services/post');
const { errorHandling, customError } = require('../../utils');

module.exports = errorHandling(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;  
  const result = await PostService.deleteById(id, userId);
  if (result.err) return next(customError(result.err.message, result.err.code));
  res.sendStatus(204);
});