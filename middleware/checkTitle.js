const checkTitleExist = (title) => !!title;

const checkTitle = (req, res, next) => {
  const { title } = req.body;

  if (!checkTitleExist(title)) {
    return res.status(400).json({ message: '"title" is required' });
  }
  next();
};

module.exports = {
  checkTitle,
};