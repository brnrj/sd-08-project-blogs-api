const clipboardy = require('clipboardy');
const crypto = require('crypto');

const key = crypto.randomBytes(100).toString('base64');

clipboardy.writeSync(key);
