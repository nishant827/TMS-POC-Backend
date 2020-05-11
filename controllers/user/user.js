const express = require("express");
const router = express.Router();
const mongoController = require("../../dbConfig/mongo.controller");
const utils = require("../../utils/utils");
const config = require("../../configurations/config");
const usersCollectionName = config.MONGO_CONFIG.DB_COLLECTIONS.USERS_COLLECTION_NAME;

router.post("/user/register", utils.verifyJWT, (req, res) => {
    let todaysDate = new Date();
    console.log(`${req.headers.host} Hit POST /user API at time-stamp : ${todaysDate.toLocaleDateString()} | ${todaysDate.toLocaleTimeString()}`);
    try {
        if (req.body && req.body.email && req.body.password) {
            mongoController.findOne(usersCollectionName, { email: req.body.email }).then((result) => {
                if (result && result.result.data && result.result.data.email) {
                    res.status(409).send({ status: false, result: { message: `User with the email : ${req.body.email} already exists try with different email.` } });
                }
                else {
                    console.log(`REQ USER : ${JSON.stringify(req.user, null, 2)}`);
                    req.body.password = utils.getEncryptedText(req.body.password);
                    mongoController.insert(usersCollectionName, req.body).then((success) => {
                        res.status(200).send({ status: true, result: { data: success.result, message: "User Registration successfull." } });
                    }, (error) => {
                        console.error(`Error occured in /user POST API : ${error}`);
                        res.status(500).send({ status: false, result: { error: error, message: `Error while registering user try after some time.` } });
                    });
                }
            }, (error) => {
                console.error(`Error occured in /user POST API : ${error}`);
                res.status(500).send({ status: false, result: { error: error, message: `Error while registering user try after some time.` } });
            });

        }
        else {
            res.status(422).send({ status: false, result: { error: `Missing required object fields.` } });
        }
    }
    catch (e) {
        console.error(`Error catched in /user POST API : ${e}`);
        res.status(500).send({ status: false, result: { error: e, message: `Error while registering user try after some time.` } });
    }
});

module.exports = router;