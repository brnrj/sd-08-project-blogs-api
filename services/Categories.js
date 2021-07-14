const boom = require('@hapi/boom');
const { Category } = require('../models');

const createCategory = async (post) => {
    try {
    const category = await Category.create({ ...post });
    return category;
    } catch (e) {
        throw boom.conflict('User already REGISTRO POST');
    }
};
module.exports = { createCategory };