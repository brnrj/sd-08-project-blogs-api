const validateTitle = require('./validateTitle');
const validateCategoryIds = require('./validateCategoryIds');
const validateContent = require('./validateContent');

const validateEntries = async (title, content, categoryIds) => {
  const isValidTitle = validateTitle(title);
  if (isValidTitle.err) return isValidTitle;
  const isValidContent = validateContent(content);
  if (isValidContent.err) return isValidContent;
  const isValidCategories = await validateCategoryIds(categoryIds);
  if (isValidCategories.err) return isValidCategories;
  return {};
};

module.exports = validateEntries;
