const stringifyErr = ({ status }, sendMessage) => JSON.stringify({ status, message: sendMessage });

module.exports = stringifyErr;
