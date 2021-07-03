const { emputTitle, emputContent, 
    emputCategoryId, notFoundCategoryId } = require('./MessagesErros');
const { Categorie } = require('../models/index');

const validInputTitle = (title) => {
    if (!title) return emputTitle;
};

const validInputContent = (content) => {
    if (!content) return emputContent;
};

const validInputCategories = (categoryId) => {
    if (!categoryId) return emputCategoryId;
};

const validCategorieNonExistent = async (categoryIds) => {
    const categoryId = await Categorie.findByPk(categoryIds[0]);

    if (!categoryId) return notFoundCategoryId;
};

module.exports = {
    validInputTitle,
    validInputContent,
    validInputCategories,
    validCategorieNonExistent,
};