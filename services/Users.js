const boom = require('@hapi/boom');
const e = require('express');
const { User } = require('../models');

const createUser = async (user) => {
    try {
    const addUser = await User.create({ ...user });
    return addUser;
    } catch (er) {
        throw boom.conflict('User already registered');
    }
};

const findAll = async () => {
    const allUsers = await User.findAll();
    return allUsers;
};

const findById = async (id) => {
    try {
    const idUsers = await User.findOne({ where: { id } });
    if (!idUsers) throw e;
    return idUsers;
    } catch (err) {
        throw boom.notFound('User does not exist');
    }
};

module.exports = { createUser, findAll, findById };