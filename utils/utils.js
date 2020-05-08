const config = require("../configurations/config");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoController = require("../dbConfig/mongo.controller");
const usersCollectionName = config.MONGO_CONFIG.DB_COLLECTIONS.USERS_COLLECTION_NAME;

var utils = {};

utils.getEncryptedText = (decryptedText) => {
    let encryptedKey = crypto.createCipher(config.APPP_CONFIG.SECURITY.ENCRYPTION_ALGORITHM, config.APPP_CONFIG.SECURITY.ENCRYPTION_KEY);
    let encryptedText = encryptedKey.update(decryptedText, 'utf8', 'hex');
    encryptedText += encryptedKey.final('hex');
    return encryptedText;
}

utils.getdecryptedText = (encryptedText) => {
    let decryptedKey = crypto.createDecipher(config.APPP_CONFIG.SECURITY.ENCRYPTION_ALGORITHM, config.APPP_CONFIG.SECURITY.ENCRYPTION_KEY);
    let decryptedText = decryptedKey.update(encryptedText, 'hex', 'utf8')
    decryptedText += decryptedKey.final('utf8');
    return decryptedText;
}

utils.generateJWT = (key) => {
    return jwt.sign(
        { userEmail: key },
        config.APPP_CONFIG.SECURITY.JWT_SECRET,
        {
            expiresIn: '3h' // expires in 3 hours
        }
    );
}

utils.verifyJWT = (req, res, next) => {
    // console.log(`req.headers : `, JSON.stringify(req.headers, null, 3));
    let token = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['context'];
    // console.log(`Token in verifyJWT : `, token);
    if (token) {
        jwt.verify(token, config.APPP_CONFIG.SECURITY.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    success: false,
                    result: {
                        message: 'Token is not valid',
                        error: err
                    }
                });
            } else {
                // console.log(`decoded 2 : ${JSON.stringify(decoded, null, 2)}`);
                try {
                    mongoController.findOne(usersCollectionName, { email: decoded.userEmail }).then((user) => {
                        console.log(`User`, JSON.stringify(user, null, 2));
                        if (user.status && user.result && user.result.data) {
                            req.user = user.result.data;
                            next();
                        }
                        else {
                            res.status(404).send({ status: false, result: { message: `User with email ${decoded.userEmail} not found.` } });
                        }
                    }, (error) => {
                        console.error(`Error occured in verifyJWT() : ${error}`);
                        res.status(500).send({ status: false, result: { error: error, message: `Error occured while verifying token.` } });
                    });
                }
                catch (e) {
                    console.error(`Error catched in verifyJWT() : ${e}`);
                    res.status(500).send({ status: false, result: { error: e } });
                }
            }
        });
    }
    else {
        res.status(422).send({
            success: false,
            result: {
                message: 'Auth token is not supplied'
            }
        });
    }
}

module.exports = utils;