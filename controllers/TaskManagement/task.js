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

router.get('/task/list', utils.verifyJWT, (req, res) => {
    try {
        mongoController.find(tasksCollectionName, {}, req.query.limit, req.query.offset).then((result) => {
            if (result && result.result && result.result.data) {
                res.json({ status: 200, message: "Fetching tasks successful", data: result.result.data, count: result.result.count })
            }
        }, (error) => {
            console.error(`Error occured in /task GET API : ${error}`);
            res.status(500).send({ status: false, result: { error: error, message: `Error while fetching the list of tasks try after some time.` } });
        })
    }
    catch (e) {
        console.error(`Error catched in /task GET API : ${e}`);
        res.status(500).send({ status: false, result: { error: e, message: `Error while fetching the list of tasks try after some time.` } });
    }
})

router.put('/task/update/:id', utils.verifyJWT, (req, res) => {
    try {
        mongoController.update(tasksCollectionName, req.body, { _id: req.params.id }).then(result => {
            if (result && result.status) {
                res.json({ status: 200, message: "Task updated successfully" })
            }
        }, (error) => {
            console.error(`Error occured in /task PUT API : ${error}`);
            res.status(500).send({ status: false, result: { error: error, message: `Error while updating the task try after some time.` } });
        })
    }
    catch (e) {
        console.error(`Error catched in /task PUT API : ${e}`);
        res.status(500).send({ status: false, result: { error: e, message: `Error while updating the task try after some time.` } });
    }
})

router.delete('/task/remove/:id', utils.verifyJWT, (req, res) => {
    try {
        mongoController.delete(tasksCollectionName, { _id: req.params.id }).then((result) => {
            if (result && result.status) {
                res.json({ status: 200, message: "Task deleted successfully" })
            }
        }, (error) => {
            console.error(`Error occured in /task DELETE API : ${error}`);
            res.status(500).send({ status: false, result: { error: error, message: `Error while deleting the task try after some time.` } });
        })
    }
    catch (e) {
        console.error(`Error catched in /task DELETE API : ${e}`);
        res.status(500).send({ status: false, result: { error: e, message: `Error while deleting the task try after some time.` } });
    }
})

router.get('/task/:id', utils.verifyJWT, (req, res) => {
    try {
        mongoController.findOne(tasksCollectionName, { _id: req.params.id }).then((result) => {
            if (result && result.result && result.result.data) {
                res.json({ status: 200, message: "Task fetched successfully", data: result.result.data })
            }
        }, (error) => {
            console.error(`Error occured in /task GET By ID API : ${error}`);
            res.status(500).send({ status: false, result: { error: error, message: `Error while fetching the task try after some time.` } });
        })
    }
    catch (e) {
        console.error(`Error catched in /task GET By ID API : ${e}`);
        res.status(500).send({ status: false, result: { error: e, message: `Error whilefetching the task try after some time.` } });
    }
})

module.exports = router