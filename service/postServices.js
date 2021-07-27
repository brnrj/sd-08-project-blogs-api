const { User, Categories, BlogPosts } = require('../models');

// codigo de resposta em algarismos romanos
// const cc = 200;
// const cci = 201;
// const z = 0;
const cd = 400;
const cdi = 401;
// const cdiv = 404;
// const cdix = 409;
// const d = 500;

const errInvalidUser = { message: 'Unauthorized user' };
const errEdit = { message: 'Categories can not be edited' };
const errTitle = { message: '"title" is required' };
const errContent = { message: '"content" is required' };

const verifyUser = async (req, res, next) => {
  const getUser = await BlogPosts.findOne({ 
    where: { id: req.params.id },
    include: [ 
    { model: User, as: 'user' },
    { model: Categories, as: 'categories', through: { attributes: [] } },
    ], 
  });

  const { id } = req.User.dataValues.id;
  
  if (id !== getUser.userId) { return res.status(cdi).json(errInvalidUser); }

  next();
};

const verifyBodyFilds = async (req, res, next) => {
  if (req.body.categoryIds) { return res.status(cd).json(errEdit); }
  if (!req.body.title) { return res.status(cd).json(errTitle); }
  if (!req.body.content) { return res.status(cd).json(errContent); }

  next();
};

module.exports = {
verifyUser,
verifyBodyFilds,

};