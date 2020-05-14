module.exports = {
    "get": {
        "security": [{ "authorization": [] }],
        "tags": [
            "USER"
        ],
        "summary": "Fetches one user in system",
        "description": "Fetches one user in system",
        "parameters": [
            {
                "name": "id",
                "in": "path",
                "required": true,
                "type": "string"
            },
            {
            "description": "find one user that are available in the system",
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
                "description": "User fetched successfully"
            },
            "500": {
                "description": "Error occured while fetching the User"
            }
        }
    }
}