const validCategorie = async (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') return '"name" is required';

  next();
};

module.exports = { validCategorie };