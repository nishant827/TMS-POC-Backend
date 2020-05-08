const mongoose = require("mongoose");

var mongoConnection = null;
var mongoConfig = {};

mongoConfig.connect = async (uri, options) => {
    try {
        let connection = await mongoose.createConnection(uri, options);

        connection.on('disconnected', (err) => {
            console.log(`MongoDB -> disconnected: ${uri}`);
            console.error(`Error in disconnection : ${err}`);
            connect();
        });

        connection.on('reconnected', (err) => {
            console.log(`MongoDB -> reconnected: ${uri}`);
            console.error(`Error in reconnection : ${err}`);
        });

        console.log(`------------------------------------------------------------------`);
        console.log(`MongoDB -> connected on ${uri}`);
        console.log(`------------------------------------------------------------------`);
        mongoConnection = connection;
    } catch (err) {
        console.log(`MongoDB -> connection error: ${uri} details->${err}`);
        process.exit(-1);
    }
}

mongoConfig.getMongoConnection = () => {
    return mongoConnection;
}

mongoConfig.convertToObjectId = function (id) {
    return mongoose.Types.ObjectId(id);
}

module.exports = mongoConfig;