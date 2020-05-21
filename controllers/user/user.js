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
        // console.log(`Req user : ${JSON.stringify(req.user, null, 2)}`);
        if (req.user.role == "SA" || req.user.role == "ZH") {
            if (req.body && req.body.email && req.body.password) {
                mongoController.findOne(usersCollectionName, { email: req.body.email }).then((result) => {
                    if (result && result.result.data && result.result.data.email) {
                        res.status(409).send({ status: false, result: { message: `User with the email : ${req.body.email} already exists try with different email.` } });
                    }
                    else {
                        req.body.password = utils.getEncryptedText(req.body.password);
                        req.body.managerId = req.user._id;
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
        else {
            res.status(403).send({ status: false, result: { error: `You don't have permissions to create the user as your role is :${req.user.role}` } });
        }
    }
    catch (e) {
        console.error(`Error catched in /user POST API : ${e}`);
        res.status(500).send({ status: false, result: { error: e, message: `Error while registering user try after some time.` } });
    }
});

router.get('/user/list', utils.verifyJWT, (req, res) => {
    try {
        let roles = ['SA', 'ZH', 'TECH'];
        let slicedInd = roles.findIndex((role) => role === req.user.role)
        mongoController.find(
            usersCollectionName,
            { _id: { $ne: req.user._id }, role: { $in: slicedInd !== 0 ? roles.slice(slicedInd + 1) : roles } },
            req.query.limit,
            req.query.offset
        ).then((result) => {
            console.log("result in get users", req.user)
            if (result && result.result && result.result.data) {
                let usersArr = result.result.data.filter((item) => String(item._id) !== String(req.user._id))
                console.log("usresArr", usersArr)
                res.json({ status: 200, message: "Fetching users successful", data: usersArr, count: result.result.count })
            }
        }, (error) => {
            console.error(`Error occured in /user GET API : ${error}`);
            res.status(500).send({ status: false, result: { error: error, message: `Error while fetching users try after some time.` } });
        })
    }
    catch (e) {
        console.error(`Error catched in /user GET API : ${e}`);
        res.status(500).send({ status: false, result: { error: e, message: `Error while fetching users try after some time.` } });
    }
});

router.put('/user/update/:id', utils.verifyJWT, (req, res) => {
    // console.log("request in update", req);
    try {
        mongoController.update(usersCollectionName, req.body, { _id: req.params.id }).then(result => {
            console.log("result", result)
            if (result && result.status) {
                res.json({ status: 200, message: "User updated successfully" })
            }
        }, (error) => {
            console.error(`Error occured in /user PUT API : ${error}`);
            res.status(500).send({ status: false, result: { error: error, message: `Error while updating the user try after some time.` } });
        })
    }
    catch (e) {
        console.error(`Error catched in /user PUT API : ${e}`);
        res.status(500).send({ status: false, result: { error: e, message: `Error while updating the user try after some time.` } });
    }
});

router.delete('/user/remove/:id', utils.verifyJWT, (req, res) => {
    try {
        mongoController.delete(usersCollectionName, { _id: req.params.id }).then(result => {
            if (result && result.status) {
                res.json({ status: 200, message: "User deleted successfully" })
            }
        }, (error) => {
            console.error(`Error occured in /user DELETE API : ${error}`);
            res.status(500).send({ status: false, result: { error: error, message: `Error while deleting the user try after some time.` } });
        })
    }
    catch (e) {
        console.error(`Error catched in /user DELETE API : ${e}`);
        res.status(500).send({ status: false, result: { error: e, message: `Error while deleting the user try after some time.` } });
    }
});

router.get('/user/search', utils.verifyJWT, (req, res) => {
    try {
        let roles = ['SA', 'ZH', 'TECH'];
        let slicedInd = roles.findIndex((role) => role === req.user.role)
        mongoController.find(usersCollectionName, {
            _id: { $ne: req.user._id }, role: { $in: slicedInd !== 0 ? roles.slice(slicedInd + 1) : roles },
            $or: [
                { firstName: { $regex: req.query.searchedText } },
                { lastName: { $regex: req.query.searchedText } },
                { email: { $regex: req.query.searchedText } }
            ]
        }, req.query.limit, req.query.offset
        ).then((result) => {
            if (result && result.result && result.result.data) {
                res.json({ status: 200, message: "Fetching users successful", data: result.result.data, count: result.result.count })
            }
        }, (error) => {
            console.error(`Error occured in /user/search GET API : ${error}`);
            res.status(500).send({ status: false, result: { error: error, message: `Error while fetching the users list based on text given try after some time.` } });
        })
    }
    catch (e) {
        console.error(`Error catched in /user/search GET API : ${e}`);
        res.status(500).send({ status: false, result: { error: e, message: `Error while fetching the users list based on text given try after some time.` } });
    }
})

router.get('/user/:id', utils.verifyJWT, (req, res) => {
    try {
        mongoController.findOne(usersCollectionName, { _id: req.params.id }).then((result) => {
            if (result && result.result && result.result.data) {
                res.json({ status: 200, message: "User fetched successfully", data: result.result.data })
            }
        }, (error) => {
            console.error(`Error occured in /user GET By ID API : ${error}`);
            res.status(500).send({ status: false, result: { error: error, message: `Error while fetching the user try after some time.` } });
        })
    }
    catch (e) {
        console.error(`Error catched in /user GET By ID API : ${e}`);
        res.status(500).send({ status: false, result: { error: e, message: `Error while fetching the user try after some time.` } });
    }
})

router.get('/user/userType/list', utils.verifyJWT, (req, res) => {
    try {
        mongoController.find(
            usersCollectionName,
            { _id: { $ne: req.user._id }, role: req.query.userType },
            req.query.limit,
            req.query.offset
        ).then((result) => {
            if (result && result.result && result.result.data) {
                res.json({ status: 200, message: "Users fetched successfully", data: result.result.data, count: result.result.count })
            }
        }, (error) => {
            console.error(`Error occured in /user GET By userType API : ${error}`);
            res.status(500).send({ status: false, result: { error: error, message: `Error while fetching the users try after some time.` } });
        })
    }
    catch (e) {
        console.error(`Error catched in /user GET By userType API : ${e}`);
        res.status(500).send({ status: false, result: { error: e, message: `Error while fetching the users try after some time.` } });
    }
})

module.exports = router;