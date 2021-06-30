const createError = require('../utils/createError');
const { Post } = require('../models');

const validatePost = require('../middleware/postValidade');

const create = async (post) => {
    const { error } = validatePost.validate(post);

    if (error) return createError(error.details[0].message);
    
    try {
       return await Post.create(post);
    } catch (err) {
       console.log(err);
    }
};

module.exports = {
    create,
};
