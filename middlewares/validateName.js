const BAD_REQUEST = 400;
const INVALID_NAME = { message: '"name" is required' };

const valName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') return res.status(BAD_REQUEST).json(INVALID_NAME);
  next();
};

module.exports = valName;
