require('dotenv').config({ path: './config.env' });
const validation = require('../validation');

const validateCategories = (req, res, next) => {
  const { name } = req.body;

  const { error } = validation.categories.validate({ name });
  if (error) {
    const errorMessage = error.details[0].message;
    console.log(errorMessage);
    return res.boom.badRequest(errorMessage);
    // return res.status(Number(process.env.STATUS_BAD_REQUEST)).json({ message: errorMessage });
  }
  next();
};

module.exports = validateCategories;