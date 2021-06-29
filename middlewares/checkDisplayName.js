const BAD_REQUEST = 400;
const INVALID_NAME = { message: '"displayName" length must be at least 8 characters long' };

const validateUser = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) return res.status(BAD_REQUEST).json(INVALID_NAME);
  next();
};

module.exports = {
    validateUser,
};