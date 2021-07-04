const rescue = require('../../utils/rescue');
const PostService = require('../../services/post');

module.exports = rescue(async (req, res, _next) => {
  const { q } = req.query;

  let result = null;
  if (q) {
    result = await PostService.search(q);
  } else {
    result = await PostService.findAll();
  }

  res.status(200).json(result);
});
