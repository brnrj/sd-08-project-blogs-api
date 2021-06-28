const postValidation = (title, content, categoryIds) => {
  if (title === undefined) return ({ code: 400, message: '"title" is required' });
  if (content === undefined) return ({ code: 400, message: '"content" is required' });
  if (categoryIds === undefined) return ({ code: 400, message: '"categoryIds" is required' });
  return null;
};

module.exports = { postValidation };
