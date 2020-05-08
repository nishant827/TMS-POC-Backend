const config = require("../configurations/config");
const mongoController = require("../dbConfig/mongo.controller");
const utils = require("./utils");
const usersCollectionName = config.MONGO_CONFIG.DB_COLLECTIONS.USERS_COLLECTION_NAME;

var seeds = {};

seeds.createdSuperUser = () => {
    let superUser = {
        "firstName": config.DEFAULT_USER_DETAILS.firstName,
        "lastName": config.DEFAULT_USER_DETAILS.lastName,
        "email": config.DEFAULT_USER_DETAILS.email,
        "password": utils.getEncryptedText(config.DEFAULT_USER_DETAILS.password),
        "age": config.DEFAULT_USER_DETAILS.age,
        "contactDetails": config.DEFAULT_USER_DETAILS.contactDetails,
        "gender": "O",
        "role": "SA"
    };

    mongoController.upsert(usersCollectionName, { email: superUser.email }, superUser).then((success) => {
        console.log(`Success in creating super user : ${success}`);
    }, (error) => {
        console.error(`Error in creating super user : ${error}`);
    });

}

module.exports = seeds;