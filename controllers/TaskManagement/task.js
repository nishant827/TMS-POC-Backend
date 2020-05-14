const express = require("express");
const router = express.Router();
const mongoController = require("../../dbConfig/mongo.controller");
const utils = require("../../utils/utils");
const config = require("../../configurations/config");
const tasksCollectionName = config.MONGO_CONFIG.DB_COLLECTIONS.TASKS_COLLECTION_NAME;

router.post('/task/new', utils.verifyJWT, (req, res) => {
    try {
        mongoController.insert(tasksCollectionName, req.body).then((result) => {
            if (result && result.result && result.result.data) {
                res.json({ status: 200, message: "Task created succesfully", data: result.result.data })
            }
        }, (error) => {
            console.error(`Error occured in /task POST API : ${error}`);
            res.status(500).send({ status: false, result: { error: error, message: `Error while creating a new task try after some time.` } });
        })
    }
    catch (e) {
        console.error(`Error catched in /task POST API : ${e}`);
        res.status(500).send({ status: false, result: { error: e, message: `Error while creating a new task try after some time.` } });
    }
})

module.exports = router