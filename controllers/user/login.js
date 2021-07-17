const { User: UserModel } = require('../../models');
const { LoginSchema } = require('../../schema/index');
const { errorHandling, customError, getJwt } = require('../../utils');

module.exports = errorHandling(async (req, res, next) => {
  const { error } = LoginSchema.validate(req.body);

  if (error) return next(customError(error.details[0].message, 'invalidData'));

  const { email, password } = req.body;
  // console.log(email, password);
  const user = await UserModel.findOne({ where: { email } });
  // console.log(user);
  if (!user || user.password !== password) {
    return next(customError('Invalid fields', 'invalidData'));
  }

  const token = getJwt({ id: user.id, email });

  res.json({ token });
});
