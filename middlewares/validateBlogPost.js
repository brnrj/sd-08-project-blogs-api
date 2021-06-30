const BAD_REQUEST = 400;
const TITLE_REQUIRED = { message: '"title" is required' };
const CONTENT_REQUIRED = { message: '"content" is required' };
const CATEGORY_REQUIRED = { message: '"categoryIds" is required' };

const valBlogPost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title) return res.status(BAD_REQUEST).json(TITLE_REQUIRED);
  if (!content) return res.status(BAD_REQUEST).json(CONTENT_REQUIRED);
  if (!categoryIds) return res.status(BAD_REQUEST).json(CATEGORY_REQUIRED);
  next();
};

module.exports = valBlogPost;
