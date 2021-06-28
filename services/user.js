const createError = require('../utils/createError');
const { User } = require('../models');

const validateUser = require('../middleware/validate');

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
};
