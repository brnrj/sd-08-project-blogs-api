const message = require('./msg');
const code = require('./code');

function error() {
  this.err = (msg, typeCode) => ({
    code: typeCode,
    err: {
       message: msg,
    },
  });
}

error.prototype.msg = message;
error.prototype.code = code;

module.exports = error;
