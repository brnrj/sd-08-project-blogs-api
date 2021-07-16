const validatePosts = (title, content, categoryIds) => {
  if (title === undefined) {
    return { status: 400, message: '"title" is required' };
  }
  if (content === undefined) {
    return { status: 400, message: '"content" is required' };
  }
  if (categoryIds === undefined) {
    return { status: 400, message: '"categoryIds" is required' };
  }
  return null;
};

module.exports = validatePosts;
