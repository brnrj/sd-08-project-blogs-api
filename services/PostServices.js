const { validInputTitle, validInputContent,
     validInputCategories, validCategorieNonExistent } = require('../schemas/PostSchemas');

     const { BlogPost, User, Categorie } = require('../models/index');

const CreatePost = async (objct) => {
    const { title, content, categoryIds, id: userId } = objct;
    const response = validInputTitle(title)
      || validInputContent(content) || validInputCategories(categoryIds)
         || await validCategorieNonExistent(categoryIds);

    if (!response) {
        const value = await BlogPost.create({ userId, title, content });
        return {
            code: 201,
            value,
        };
    }

    return response;
};

const ListPosts = async () => {
    const user = await BlogPost.findAll(
        { include: [
             { model: User, as: 'user' },
             { model: Categorie, as: 'categories', through: { attributes: [] } }, 
            ] },
);
    return {
        code: 200,
        value: user,
    };
};

module.exports = {
    CreatePost,
    ListPosts,
};