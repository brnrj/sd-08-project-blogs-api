const checkCategoryExist = (categoryIds) => !!categoryIds;

function checkCategory(req, res, next) {
  const { categoryIds } = req.body;
  
  if (checkCategoryExist(categoryIds)) {
    return res.status(400).json({ message: 'Categories cannot be edited' });
  }
  next();
}

module.exports = {
  checkCategory,
};