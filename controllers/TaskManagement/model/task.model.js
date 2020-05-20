var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate')
const config = require("../../../configurations/config");
const tasksCollectionName = config.MONGO_CONFIG.DB_COLLECTIONS.TASKS_COLLECTION_NAME;
const usersCollectionName = config.MONGO_CONFIG.DB_COLLECTIONS.USERS_COLLECTION_NAME;


var taskModel = () => {
    var taskSchema = Schema({
        towerId: String,
        address: String,
        taskType: String,
        taskTitle: String,
        taskDescription: String,
        technicians: [{ type: Schema.Types.ObjectId, ref: 'users', autopopulate: true }],
        startDate: { type: Date },
        estimatedEndDate: { type: Date },
        status: String,
        item: String
    }, { timestamp: true, collection: tasksCollectionName })

    taskSchema.plugin(autopopulate)

    return mongoose.model(tasksCollectionName, taskSchema)
}

module.exports = new taskModel()