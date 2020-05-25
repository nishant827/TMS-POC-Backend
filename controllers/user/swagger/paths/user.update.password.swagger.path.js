module.exports = {
    "put": {
        "security": [{ "authorization": [] }],
        "tags": [
            "USER"
        ],
        "summary": "Updates an user password in system",
        "description": "Updates an user password in system",
        "parameters": [
            {
                "name": "user",
                "in": "body",
                "description": "USER that we want to update password",
                "schema": {
                    "properties":{
                    "currentPassword": {
                        "type": "string"
                    },
                    "newPassword": {
                        "type": "string"
                    }
                }
                }
            }
        ],
        "produces": [
            "application/json"
        ],
        "responses": {
            "200": {
                "description": "User password updated successfully"
            },
            "500": {
                "description": "Error occured in updating User Password"
            }
        }
    }
}