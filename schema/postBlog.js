const { checkContent, checkCategoryIds, checkTitle } = require('./fields');

const validPostBlog = (post) => {
  const { content, title, categoryIds } = post;
  const check = {
    content: checkContent(content),
    title: checkTitle(title),
    categoryIds: checkCategoryIds(categoryIds),
  };
  const result = Object.values(check).find((el) => typeof el === 'object');
  return result || true;
};

module.exports = validPostBlog;
