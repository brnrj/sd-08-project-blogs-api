const validation = require('../validation');

const validateBlogPost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  const { error } = validation.blogPost.validate({ title, content, categoryIds });
  if (error) {
    const errorMessage = error.details[0].message;
    console.log(errorMessage);
    return res.boom.badRequest(errorMessage);
  }
  next();
};

module.exports = validateBlogPost;