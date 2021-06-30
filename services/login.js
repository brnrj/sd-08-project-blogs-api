const createError = require('../utils/createError');
const { Login } = require('../models');

const createJWT = require('../utils/createJWT');

const validateLogin = require('../middleware/loginValidade');

const create = async (login) => {
    const { error } = validateLogin.validate(login);

    if (error) return createError(error.details[0].message);
    
    try {
       const result = await Login.create(login);
       const token = createJWT(result);
       return token;
    } catch (err) {
       console.log(err);
    }
};

module.exports = {
    create,
};
