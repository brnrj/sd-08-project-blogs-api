const { status, message } = require('../schema/status');

const validateName = async (req, res, next) => {
  const { name } = req.body;
  if (name === undefined) {
    return res.status(status.badRequest).json({ message: message.requiredName });
  }
  next();
};

module.exports = {
  validateName,
};
