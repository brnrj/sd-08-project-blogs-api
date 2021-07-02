const { tokenDecodation, stringifyErr } = require('../../utils');
const { User: UserModel } = require('../../models');
const { UNAUTHORIZED } = require('../../utils/errors');

const { Token: {
  tokenNotFound,
  invalidToken,
} } = UNAUTHORIZED;

const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error(stringifyErr(UNAUTHORIZED, tokenNotFound));
    const decodation = await tokenDecodation(authorization);
    if (decodation === null) throw new Error(stringifyErr(UNAUTHORIZED, invalidToken));
    const { data: { email: decodedEmail, password: decodedPassword } } = decodation;
    const verifyIfValid = await UserModel.findOne({
      where: { email: decodedEmail, password: decodedPassword },
    });
    if (verifyIfValid === null) throw new Error(stringifyErr(UNAUTHORIZED, invalidToken));
    next();
  } catch (e) {
    console.log(e.message, 'verifyToken');
    const errorCore = JSON.parse(e.message);
    res.status(errorCore.status).send(errorCore.message);
  }
};

module.exports = verifyToken;
