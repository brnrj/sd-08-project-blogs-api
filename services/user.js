const { User } = require('../models');
const { generateToken } = require('../middlewares');

async function createUser(body) {
    const { email } = body;
    const data = await User.findOne({ where: { email } });
    if (data) throw new Error('User already registered');
    await User.create(body);
    return { token: generateToken(data) };
}

async function login(body) {
    const { email } = body;
    const data = await User.findOne({ where: { email } });
    if (!data) throw new Error('Invalid fields');
    return { token: generateToken(data) };
}

async function getAllUsers() {
    const data = await User.findAll();
    return data;
}

async function getUserById(id) {
    const data = await User.findByPk(id);
    if (!data) throw new Error('User does not exist');
    return data;
}

module.exports = {
    createUser,
    login,
    getAllUsers,
    getUserById,
};
