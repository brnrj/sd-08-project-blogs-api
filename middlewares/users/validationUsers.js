const userSchema = require('../../schemas/users');

module.exports = (req, _res, next) => {
  const user = req.body;

  const { error } = userSchema.validate(user, { abortEarly: false });

  if (error) {
    const err = { statusCode: 400, isJoi: true, ...error };
    next(err);
  }

  next();
};