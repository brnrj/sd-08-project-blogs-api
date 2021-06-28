const createError = require('../utils/createError');
const { User } = require('../models');

const validateUser = require('../middleware/userValidade');

const getAll = async (autorization) => {
    if (!autorization) return { message: 'Token not found' };
    if (autorization.length < 15) return { message: 'Expired or invalid token' };

    try {
        return await User.findAll();        
    } catch (e) {
        console.log(e.message);
    }
};

const create = async (user) => {
    const { error } = validateUser.validate(user);

    if (error) return createError(error.details[0].message);

    try {
       return await User.create(user);
    } catch (err) {
       return { err: 'User already registered' };
    }
};

module.exports = {
    create,
    getAll,
};
