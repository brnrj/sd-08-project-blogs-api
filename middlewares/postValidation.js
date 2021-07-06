const { Categories } = require('../models');

const requiredField = (input, field = 'title') => {
    if (!input) return `"${field}" is required`;
};

const BAD_REQUEST = 400;

const postValidation = async (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    const message = requiredField(title) 
        || requiredField(content, 'content')
        || requiredField(categoryIds, 'categoryIds');
    if (message) return res.status(BAD_REQUEST).json({ message });
    const categories = await Promise
        .all(categoryIds.map((categoryId) => Categories.findByPk(categoryId)));
    if (categories.some((category) => !category)) {
     return res.status(BAD_REQUEST).json({ message: '"categoryIds" not found' });
    }
    next();
};

module.exports = postValidation;