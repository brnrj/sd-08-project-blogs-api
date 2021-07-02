const { searchSpecificCatg } = require('../../services');

const searchTheCatgById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const searchSpecific = await searchSpecificCatg(id);
    res.status(200).send(searchSpecific);
  } catch (e) {
    console.log(e.message, 'Controllers, searchTheCatgById.js');
    res.status(500).send(e.message);
  }
};

module.exports = searchTheCatgById;
