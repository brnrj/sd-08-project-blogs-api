const validation = require('../validation');

const validateCategories = (req, res, next) => {
  const { name } = req.body;

  const { error } = validation.Categories.validate({ name });
  if (error) {
    const errorMessage = error.details[0].message;
    console.log(errorMessage);
    return res.boom.badRequest(errorMessage);
  }
  next();
};

module.exports = validateCategories;