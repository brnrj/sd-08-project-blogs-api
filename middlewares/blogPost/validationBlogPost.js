const postSchema = require('../../schema/posts');

module.exports = (req, _res, next) => {
  const { error } = postSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const err = { statusCode: 400, isJoi: true, ...error };
    next(err);
  }

  next();
};