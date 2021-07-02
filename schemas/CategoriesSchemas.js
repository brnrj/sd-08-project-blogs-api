const { emputNameCategorie } = require('./MessagesErros');

const ValidName = (name) => {
    if (!name) return emputNameCategorie; 
};

module.exports = {
    ValidName,
};