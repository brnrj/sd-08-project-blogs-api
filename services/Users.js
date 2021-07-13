const boom = require('@hapi/boom');
const { User } = require('../models');

const createUser = async (user) => {
    try {
    const addUser = await User.create({ ...user });
    return addUser;
    } catch (e) {
        const { errors } = e;// dependendo do erro do sequelize podemos  personalizamos a mensagem
        console.log(errors[0]);
        throw boom.conflict('User already registered');
    }
};
module.exports = { createUser };