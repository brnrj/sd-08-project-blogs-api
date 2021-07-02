const { searchAllCatgs } = require('../../services');

const searchAllTheCatgs = async (_req, res, _next) => {
  try {
    const searching = await searchAllCatgs();
    return res.status(200).send(searching);
  } catch (e) {
    console.log(e.message, 'Controllers, searchAllTheCatgs.js');
    res.status(500).send(e.message);
  }
};
module.exports = searchAllTheCatgs;
