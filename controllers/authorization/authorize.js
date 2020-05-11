const express = require("express");
const router = express.Router();
const mongoController = require("../../dbConfig/mongo.controller");
const utils = require("../../utils/utils");
const config = require("../../configurations/config");
const usersCollectionName = config.MONGO_CONFIG.DB_COLLECTIONS.USERS_COLLECTION_NAME;

router.post("/login", (req, res) => {
    let todaysDate = new Date();
    console.log(`${req.headers.host} Hit POST /login API at time-stamp : ${todaysDate.toLocaleDateString()} | ${todaysDate.toLocaleTimeString()}`);
    if (!req.body.email || !req.body.password || req.body.email == "" || req.body.password == "") {
        res.status(422).send({ status: false, result: { error: `Missing required params!`, message: `email or password missing in request body.` } });
        return;
    }
    try {
        let query = { email: req.body.email, password: utils.getEncryptedText(req.body.password) };
        mongoController.findOne(usersCollectionName, query).then((user) => {
            if (user.status && user.result && user.result.data) {
                user = user.result.data;
                let token = utils.generateJWT(user.email);
                delete user.password;
                // console.log(`User : ${JSON.stringify(user, null, 2)}`);
                res.status(200).send({ status: true, result: { data: { token: token, user: user }, message: `Authentication successful!` } });
            }
            else {
                res.status(401).send({ status: false, result: { data: user, message: `Incorrect email or password.` } });
            }
        }, (error) => {
            console.error(`Error occured in /login POST API : ${error}`);
            res.status(500).send({ status: false, result: { error: error } });
        });
    } catch (e) {
        console.error(`Error catched in /login POST API : ${e}`);
        res.status(500).send({ status: false, result: { error: e } });
    }

});

module.exports = router;