module.exports = {
    "delete": {
        "security": [{ "authorization": [] }],
        "tags": [
            "USER"
        ],
        "summary": "Deletes an user in system",
        "description": "Deletes an user in system",
        "parameters": [{
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
                "description": "User deleted successfully"
            },
            "500": {
                "description": "Error occured in deleting User"
            }
        }
    }
}