module.exports = {
    "put": {
        "security": [{ "authorization": [] }],
        "tags": [
            "USER"
        ],
        "summary": "Updates an user in system",
        "description": "Updates an user in system",
        "parameters": [
            {
                "name": "id",
                "in": "path",
                "required": true,
                "type": "string"
            },
            {
                "name": "user",
                "in": "body",
                "description": "USER that we want to update",
                "schema": {
                    "$ref": "#/definitions/User"
                }
            }
        ],
        "produces": [
            "application/json"
        ],
        "responses": {
            "200": {
                "description": "User updated successfully"
            },
            "500": {
                "description": "Error occured in updating User"
            }
        }
    }
}