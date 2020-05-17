const jwt = require("jsonwebtoken");
const {promisify} = require("util");

const jwtSign = promisify(jwt.sign);
const jwtVerify = promisify(jwt.verify);

module.exports={
    jwtSign,jwtVerify
}