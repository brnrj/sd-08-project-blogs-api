const missingTitle = (title) => {
  if (!title) {
    throw new Error('"title" is required$400');
  }
};

const missingContent = (content) => {
  if (!content) {
    throw new Error('"content" is required$400');
  }
};

const missingCategoryIds = (categoryIds) => {
  if (!categoryIds) {
    throw new Error('"categoryIds" is required$400');
  }
};

const cannotUpdateCategoryIds = (categoryIds) => {
  if (categoryIds) {
    throw new Error('Categories cannot be edited$400');
  }
};

module.exports = {
  missingTitle,
  missingContent,
  missingCategoryIds,
  cannotUpdateCategoryIds,
};