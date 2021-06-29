const titleContentValidation = (title, content) => {
  if (title === undefined) return ({ code: 400, message: '"title" is required' });
  if (content === undefined) return ({ code: 400, message: '"content" is required' });
  return null;
};

const postUpdateValidation = (body) => {
  const { title, content, categoryIds } = body;
  const titleNcoment = titleContentValidation(title, content);
  if (titleNcoment) return titleNcoment;
  if (categoryIds) return ({ code: 400, message: 'Categories cannot be edited' });
  return null;
};

const postCreateValidation = (body) => {
  const { title, content, categoryIds } = body;
  const titleNcoment = titleContentValidation(title, content);
  if (titleNcoment) return titleNcoment;
  if (categoryIds === undefined) return ({ code: 400, message: '"categoryIds" is required' });
  return null;
};

module.exports = { postCreateValidation, postUpdateValidation };
