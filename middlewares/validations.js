const Schemas = require('../schemas');
const tcw = require('../utils').tryCatchWrapper;

const options = { errors: { wrap: { label: '"' } } };

const validate = (resource) => (type) => tcw(async (req, _res, next) => {
  const schema = Schemas[resource][type];
  await schema.validateAsync(req.body, options);
  next();
}, 'badRequest');

module.exports = {
  Users: validate('Users'),
  Categories: validate('Categories'),
  BlogPosts: validate('BlogPosts'),
};
