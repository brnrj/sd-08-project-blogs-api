const postService = require('../services/post');

const create = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const result = await postService.create({ title, content, categoryIds });
    if (result.message) return res.status(400).json(result);
    return res.status(201).json(result);
};

module.exports = {
    create,
};