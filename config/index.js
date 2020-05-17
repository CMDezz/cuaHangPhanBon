const dotenv = require("dotenv");
dotenv.config();

let userName;
let password;
let secretKey;
let port;
let mongodbUri;

switch (process.env.NODE_ENV) {
    case "local":
        port = process.env.LOCAL_PORT;
        mongodbUri = process.env.LOCAL_MONGODB_URI
        userName = process.env.LOCAL_USER_NAME;
        password = process.env.LOCAL_PASSWORD;
        secretKey = process.env.LOCAL_SECRET_KEY;
        break;

    case "staging":
        port = process.env.STAGING_PORT;
        mongodbUri = process.env.STAGING_MONGODB_URI
            userName = process.env.STAGING_USER_NAME;
            password = process.env.STAGING_PASSWORD;
            secretKey = process.env.STAGING_SECRET_KEY;
        break;
}

module.exports={
    userName,password,secretKey,port,mongodbUri
}