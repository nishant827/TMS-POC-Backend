var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const config = require("../../../configurations/config");
const tasksCollectionName = config.MONGO_CONFIG.DB_COLLECTIONS.TASKS_COLLECTION_NAME;
const usersCollectionName = config.MONGO_CONFIG.DB_COLLECTIONS.USERS_COLLECTION_NAME;

var techinicianSchema = Schema({
    id: { type: Schema.Types.ObjectId, ref: usersCollectionName },
    name: String
}, { _id: false })

var taskModel = () => {
    var taskSchema = Schema({
        towerId: String,
        address: String,
        taskType: String,
        taskTitle: String,
        taskDescription: String,
        technicians: [techinicianSchema],
        startDate: { type: Date },
        estimatedEndDate: { type: Date },
        status: String,
        item: String
    }, { timestamp: true, collection: tasksCollectionName })

    return mongoose.model(tasksCollectionName, taskSchema)
}

module.exports = new taskModel()