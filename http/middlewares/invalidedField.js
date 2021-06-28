const HandleError = require('../errors/HandleError');

exports.validadeNotCategories = (req, res, next) => {
  if (req.body.categoryIds) throw new HandleError('Categories cannot be edited');
  next();
};