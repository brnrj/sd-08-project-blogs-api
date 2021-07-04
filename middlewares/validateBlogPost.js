const { BAD_REQUEST } = require('../common/constants/statusCodes');
const postValidation = require('../validations/postValidation');

const validateBlogPost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  const { error } = postValidation.validate({ title, content, categoryIds });
  if (error) {
    const errorMessage = error.details[0].message;
    // console.log(errorMessage);
    return res.status(BAD_REQUEST).json({ message: errorMessage });
  }
  next();
};

module.exports = validateBlogPost;
