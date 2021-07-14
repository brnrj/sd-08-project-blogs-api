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

const findAll = async () => {
    const allUsers = await Category.findAll();
    return allUsers;
};
module.exports = { createCategory, findAll };