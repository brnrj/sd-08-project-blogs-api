const createError = require('../utils/createError');
const { User } = require('../models');

const createJWT = require('../utils/createJWT');

const validateUser = require('../middleware/userValidade');

const getAll = async () => {
    try {
        return await User.findAll();        
    } catch (e) {
        console.log(e.message);
    }
};

const getById = async (id) => {
    try {
        return await User.findByPk(id);        
    } catch (e) {
        console.log(e.message);
    }
};

const create = async (user) => {
    const { error } = validateUser.validate(user);

    if (error) return createError(error.details[0].message);

    try {
       const response = await User.create(user);
       const token = createJWT(response);
       return token;
    } catch (err) {
       return { err: 'User already registered' };
    }
};

module.exports = {
    create,
    getAll,
    getById,
};
