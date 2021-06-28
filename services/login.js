const createError = require('../utils/createError');
const { Login } = require('../models');

const validateLogin = require('../middleware/loginValidade');

const create = async (login) => {
    const { error } = validateLogin.validate(login);

    if (error) return createError(error.details[0].message);
    
    try {
       return await Login.create(login);
    } catch (err) {
       console.log(err);
    }
};

module.exports = {
    create,
};
