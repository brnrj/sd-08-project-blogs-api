const createError = require('../utils/createError');
const { BlogPost, Categorie, User } = require('../models');

const validatePost = require('../middleware/postValidade');

const getAll = async () => {
    try {
        const result = await BlogPost.findAll({
            include: [
                { model: User, as: 'user', attributes: { exclude: ['password'] } },
                { model: Categorie, as: 'categories', through: { attributes: [] } },
            ],
        }); 
        return result;       
    } catch (e) {
        console.log(e.message);
    }
};

const create = async (body, user) => {
    const { error } = validatePost.validate(body);
    if (error) return createError(error.details[0].message);
    
    const allCategories = await BlogPost.count({ where: { id: body.categoryIds } });
    if (!allCategories) return { message: '"categoryIds" not found' };

    const { title, content } = body;
    try {
        const newPost = await BlogPost.create({            
            userId: user,
            title,
            content,
            published: new Date(),
            updated: new Date(),
        });
        return newPost;
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getAll,
    create,
};
