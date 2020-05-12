module.exports = {
    "get": {
        "security": [{ "authorization": [] }],
        "tags": [
            "USER"
        ],
        "summary": "Fetches all users in system",
        "description": "Fetches all users in system",
        "parameters": [{
            "description": "List of users that are available in the system",
            "name":"Description",
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