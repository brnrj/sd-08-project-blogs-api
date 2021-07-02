const { NOT_FOUND } = require('../../utils/errors');

const { User: { userNotFound } } = NOT_FOUND;
const { User: UserModel } = require('../../models');
const stringyErr = require('../../utils/stringfy');

const verifyIfUserIdMatches = async (req, res, next) => {
  try {
    const { id } = req.params;
    const searchUserid = await UserModel.findOne({ where: { id } });
    if (searchUserid === null) throw new Error(stringyErr(NOT_FOUND, userNotFound));
    return next();
  } catch (e) {
    console.log(e.message, 'Middlewares, UserRelated, verifyIfUserIdMatches');
    const errorCore = JSON.parse(e.message);
    res.status(errorCore.status).send(errorCore.message);
  }
};

module.exports = verifyIfUserIdMatches;
