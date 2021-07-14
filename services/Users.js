const boom = require('@hapi/boom');
const { User } = require('../models');

const createUser = async (user) => {
    try {
    const addUser = await User.create({ ...user });
    return addUser;
    } catch (e) {
        throw boom.conflict('User already registered');
    }
};

const findAll = async () => {
    const allUsers = await User.findAll();
    return allUsers;
};
module.exports = { createUser, findAll };