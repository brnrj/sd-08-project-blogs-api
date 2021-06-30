const { BAD_REQUEST } = require('../consts');
const { requestError } = require('../requestError');

const isValidField = (field) => {
  if (!field) {
    requestError('"name" is required', BAD_REQUEST);
  }
};

const fieldValidation = async (req, res, next) => {
  const { name } = req.body;
  try {
  isValidField(name);
  next();
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  fieldValidation,
};