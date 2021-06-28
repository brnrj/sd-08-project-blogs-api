const { BAD_REQUEST } = require('../helpers');

const joiValidate = async (schema, obj) => {
    try {
        await schema.validateAsync(obj);    
    } catch (error) {
        const err = { status: BAD_REQUEST, message: error.message };
        throw err;
    }
};

module.exports = { joiValidate };
