require('dotenv').config(); // to take config values from environment variables
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const config = require("./configurations/config");
const mongoConfig = require("./dbConfig/mongo.config");
var swaggerDocument = require("./swaggerConfig/swagger");
var cors = require('cors');
const app = express();

(async () => {
    let dbUri = `mongodb://${config.MONGO_CONFIG.DB_HOST}:${config.MONGO_CONFIG.DB_PORT}/${config.MONGO_CONFIG.DB_NAME}`;
    await mongoConfig.connect(dbUri, config.MONGO_CONFIG.OPTIONS); // Making db connection
    app.use(cors());
    app.use(bodyParser.json()); // to respond back in json format

    /* Default api */
    app.get('/', (req, res) => {
        let todaysDate = new Date();
        console.log(`${req.headers.host} Hit GET / API at time-stamp : ${todaysDate.toLocaleDateString()} | ${todaysDate.toLocaleTimeString()}`);
        res.send(`<h2> Welcome TMS-POC home! </h2>`);
    });

    /* Swagger documentation implementation with swagger UI available host:port/api-docs */
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Injecting all API's via express router
    app.use(require('./controllers'));

    app.listen(config.APPP_CONFIG.PORT, () => {
        console.log(`APP running on PORT : ${config.APPP_CONFIG.PORT}`);
    });

    /* Will create a super user in the DB */
    if (config.IS_DEFAULT_USER_ENABLE == "1") {
        require("./utils/seeds").createdSuperUser();
    }

})();