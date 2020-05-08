module.exports = {
    "post": {
        "security": [{ "authorization": [] }],
        "tags": [
            "USER"
        ],
        "summary": "Creates new user in system",
        "description": "Creates new user in system",
        "parameters": [{
            "name": "user",
            "in": "body",
            "description": "USER that we want to create",
            "schema": {
                "$ref": "#/definitions/User"
            }
        }],
        "produces": [
            "application/json"
        ],
        "responses": {
            "200": {
                "description": "New User is created"
            },
            "500": {
                "description": "Error occured in creating User"
            }
        }
    }
}