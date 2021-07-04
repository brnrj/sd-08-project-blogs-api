const categorySchema = require('../../schema/categories');

module.exports = (req, _res, next) => {
  const { error } = categorySchema.validate(req.body, { abortEarly: false });

  if (error) {
    const err = { statusCode: 400, isJoi: true, ...error };
    next(err);
  }

  next();
};