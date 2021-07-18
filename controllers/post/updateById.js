const PostService = require('../../services/post');
const { errorHandling, customError } = require('../../utils');

module.exports = errorHandling(async (req, res, next) => {
    const { id } = req.params;
    console.log(req.user.id);
    const result = await PostService.updateById(id, req.body, req.user.id);
    if (result.err) return next(customError(result.err.message, result.err.code));
    res.status(200).json(result);
});
