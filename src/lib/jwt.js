const jsonwebtoken = require('jsonwebtoken');
const {promisify} = require('util');

const sign = promisify(jsonwebtoken.sign);
const verify = promisify(jsonwebtoken.verify);

module.exports = {sign,verify}