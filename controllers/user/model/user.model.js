const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const Schema = mongoose.Schema;
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const config = require("../../../configurations/config");
const usersCollectionName = config.MONGO_CONFIG.DB_COLLECTIONS.USERS_COLLECTION_NAME;

const usersSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    contactDetails: {
        countryCode: {
            type: String,
            required: true
        },
        mobileNumber: {
            type: String,
            required: true
        },
    },

    gender: {
        type: String,
        enum: ['M', 'F', 'O'],
        default: 'M',
        required: true
    },

    role: {
        type: String,
        enum: ['SA', 'ZH', 'TECH'],
        default: 'TECH',
        required: true
    },

    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    // createdByIDs: [{
    //     type: String,
    //     required: false
    // }]

});

usersSchema.plugin(beautifyUnique);
usersSchema.plugin(timestamps);

module.exports = mongoose.model(usersCollectionName, usersSchema, usersCollectionName);