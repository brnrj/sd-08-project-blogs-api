const BAD_REQUEST = 400;

const verifyCategory = async (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(BAD_REQUEST).json({ message: '"name" is required' });
  next();
};

module.exports = {
  verifyCategory,
};