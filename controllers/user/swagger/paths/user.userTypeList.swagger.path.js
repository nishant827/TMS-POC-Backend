module.exports = {
    "get": {
        "security": [{ "authorization": [] }],
        "tags": [
            "USER"
        ],
        "summary": "Users fetching by userType in system",
        "description": "Users fetching by userType in system",
        "parameters": [{
            "name": "limit",
            "in": "query",
            "required": true,
            "type": "number"
        }, {
            "name": "offset",
            "in": "query",
            "required": true,
            "type": "number"
        }, {
            "name": "userType",
            "in": "query",
            "required": true,
            "type": "string"
        }, {
            "description": "Users fetching by userType in the system",
            "name": "Description",
            "schema": {
                "$ref": "#/definitions/User"
            }
        }],
        "produces": [
            "application/json"
        ],
        "responses": {
            "200": {
                "description": "Users fetched successfully"
            },
            "500": {
                "description": "Error occured while fetching the Users"
            }
        }
    }
}