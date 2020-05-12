const mongoConfig = require("./mongo.config");
var mongoController = {};

/**
 * The insert method will insert document in  given collection name
 * @param collectionName: mongodb collection name
 * @param payload: document to insert
 * @author Nishant Singh Gawer
 * @version 1.0
*/
mongoController.insert = (collectionName, payload) => {
    return new Promise((resolve, reject) => {
        try {
            getMongoConnection().then((connection) => {
                connection.collection(collectionName).insert(payload, (err, doc) => {
                    if (err) {
                        console.error(`Mongo Insertion Error : ${err}`);
                        let message = '';
                        for (let key in err.errors) {
                            message = err.errors[key].message;
                            console.error("message", err.errors[key].message)
                        }
                        reject({
                            status: false,
                            result: { message: message }
                        });
                    } else {
                        resolve({
                            status: true,
                            result: { data: doc._doc }
                        });
                    }
                });

            }, (error) => {
                console.error(`Error in getting connection ${collectionName} : ${error}`);
                reject(error);
            });
        }
        catch (e) {
            console.error(`Error catched in inserting document : ${e}`);
            reject(e);
        }
    });
}

/**
 * The update method will update the document in given collection name
 * @param collectionName: mongodb collection name
 * @param payload: document to update
 * @param query: mongodb query
 * @author Bindu Latha Nuthalapati
 * @version 1.0
*/
mongoController.update = (collectionName, payload, query) => {
    return new Promise((resolve, reject) => {
        try {
            getMongoConnection().then((connection) => {
                connection.collection(collectionName).update(query, { $set: payload }, (err, doc) => {
                    if (err) {
                        console.error(`Mongo Updation Error : ${err}`);
                        let message = '';
                        for (let key in err.errors) {
                            message = err.errors[key].message;
                            console.error("message", err.errors[key].message)
                        }
                        reject({
                            status: false,
                            result: { message: message }
                        });
                    } else {
                        console.log("update result", doc)
                        resolve({
                            status: true
                        });
                    }
                });
            }, (error) => {
                console.error(`Error in getting connection ${collectionName} : ${error}`);
                reject(error);
            });
        }
        catch (e) {
            console.error(`Error catched in updating document : ${e}`);
            reject(e);
        }
    });
}

/**
 * The find method will fetch all the documents from given collection name
 * @param collectionName: mongodb collection name
 * @param query: mongodb query
 * @author Bindu Latha Nuthalapati
 * @version 1.0
*/
mongoController.find = (collectionName, query) => {
    return new Promise((resolve, reject) => {
        try {
            getMongoConnection().then((connection) => {
                connection.collection(collectionName).find(query).toArray((err, docs) => {
                    if (err) {
                        console.error(`Mongo Find Error : ${err}`);
                        let message = '';
                        for (let key in err.errors) {
                            message = err.errors[key].message;
                            console.error("message", err.errors[key].message)
                        }
                        reject({
                            status: false,
                            result: { message: message }
                        });
                    } else {
                        resolve({
                            status: true,
                            result: { data: docs }
                        });
                    }
                });
            }, (error) => {
                console.error(`Error in getting connection ${collectionName} : ${error}`);
                reject(error);
            });
        }
        catch (e) {
            console.error(`Error catched while fetching the documents : ${e}`);
            reject(e);
        }
    });
}

/**
 * The delete method will delete the document from given collection name
 * @param collectionName: mongodb collection name
 * @param query: mongodb query
 * @author Bindu Latha Nuthalapati
 * @version 1.0
*/
mongoController.delete = (collectionName, query) => {
    return new Promise((resolve, reject) => {
        try {
            getMongoConnection().then((connection) => {
                connection.collection(collectionName).deleteOne(query, (err, doc) => {
                    if (err) {
                        console.error(`Mongo Remove Error : ${err}`);
                        let message = '';
                        for (let key in err.errors) {
                            message = err.errors[key].message;
                            console.error("message", err.errors[key].message)
                        }
                        reject({
                            status: false,
                            result: { message: message }
                        });
                    } else {
                        resolve({
                            status: true,
                            result: { data: doc._doc }
                        });
                    }
                });
            }, (error) => {
                console.error(`Error in getting connection ${collectionName} : ${error}`);
                reject(error);
            });
        }
        catch (e) {
            console.error(`Error catched while removing the document : ${e}`);
            reject(e);
        }
    });
}


/**
 * The findOne method will find record based on the input query
 * @param collectionName: mongodb collection name
 * @param query: mongodb query
 * @author Nishant Singh Gawer
 * @version 1.0
*/
mongoController.findOne = (collectionName, query) => {
    return new Promise((resolve, reject) => {
        try {
            getMongoConnection().then((connection) => {
                connection.collection(collectionName).findOne(query, (err, doc) => {
                    if (err) {
                        reject({
                            status: false,
                            message: err
                        });
                    } else {
                        resolve({
                            status: true,
                            result: { data: doc }
                        });
                    }
                });
            }, (error) => {
                console.error(`Error in getting connection ${collectionName} : ${error}`);
                reject(error);
            });
        }
        catch (e) {
            console.error(`Error catched in finding one document : ${e}`);
            reject(e);
        }
    });
}

/**
 * The upsert method will update record / create if record not availiable based on the input query
 * @param collectionName: mongodb collection name
 * @param query: mongodb query
 * @param payload: data to update / insert
 * @author Nishant Singh Gawer
 * @version 1.0
*/
mongoController.upsert = (collectionName, query, payload) => {
    return new Promise((resolve, reject) => {
        try {
            getMongoConnection().then((connection) => {
                connection.collection(collectionName).findOneAndUpdate(query, { $set: payload }, { upsert: true }, (err, doc) => {
                    if (err || doc == null) {
                        reject({
                            status: false,
                            result: { message: err }
                        });
                    } else {
                        resolve({
                            status: true,
                            result: { data: doc._doc }
                        });
                    }
                });

            }, (error) => {
                console.error(`Error in getting connection ${collectionName} : ${error}`);
                reject(error);
            });

        } catch (e) {
            console.log(e.message);
            reject({
                status: false,
                result: { message: e.message }
            });
        }
    });
}

/**
 * The convertToObjectId method will convert a string mongoId into mongo object id
 * @param id : mongoId in string format
 * @author Nishant Singh Gawer
 * @version 1.0
*/
mongoController.convertToObjectId = (id) => {
    return mongoConfig.convertToObjectId(id);
}

/**
 * The getMongoConnection method returns the mongo connection object
 * @author Nishant Singh Gawer
 * @version 1.0
*/
function getMongoConnection() {
    return new Promise((resolve, reject) => {
        try {
            var mongoConnection = mongoConfig.getMongoConnection();
            resolve(mongoConnection);
        }
        catch (e) {
            console.error(`Error catched in getting connection : ${e}`);
            reject(e);
        }
    });
}

module.exports = mongoController;
