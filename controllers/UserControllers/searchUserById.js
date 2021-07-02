const { searchUserById } = require('../../services');

const searchTheUserById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const searchSpecific = await searchUserById(id);
    res.status(200).send(searchSpecific);
  } catch (e) {
    console.log(e.message, 'Controllers, searchTheUserById.js');
    res.status(500).send(e.message);
  }
};

module.exports = searchTheUserById;
