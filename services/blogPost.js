const STATUS_400 = 400;

const validBlogPost = (req, res, next) => {
const { title, content, categoryIds } = req.body;
  if (!title) return res.status(STATUS_400).json({ message: '"title" is required' });
  if (!content) return res.status(STATUS_400).json({ message: '"content" is required' });
  if (!categoryIds) return res.status(STATUS_400).json({ message: '"categoryIds" is required' });
  next();
};

module.exports = {
  validBlogPost,
};
