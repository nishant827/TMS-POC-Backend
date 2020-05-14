module.exports = {
    "get": {
        "security": [{ "authorization": [] }],
        "tags": [
            "USER"
        ],
        "summary": "Fetches all users which matches the given input",
        "description": "Fetches all users in system",
        "parameters": [{
            "description": "List of users which matches the given input",
            "name": "Description",
            "schema": {
                "$ref": "#/definitions/User"
            }
        }, {
            "name": "searchedText",
            "in": "query",
            "required": true,
            "type": "string"
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