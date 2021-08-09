const checkContentExist = (content) => !!content;

const checkContent = (req, res, next) => {
  const { content } = req.body;

  if (!checkContentExist(content)) {
    return res.status(400).json({ message: '"content" is required' });
  }
  next();
};

module.exports = {
  checkContent,
};