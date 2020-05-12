module.exports = {
    "put": {
        "security": [{ "authorization": [] }],
        "tags": [
            "USER"
        ],
        "summary": "Updates an user in system",
        "description": "Updates an user in system",
        "parameters": [{
            "name": "user",
            "in": "body",
            "description": "USER that we want to update",
            "schema": {
                "$ref": "#/definitions/User"
            }
        }, {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
        }],
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