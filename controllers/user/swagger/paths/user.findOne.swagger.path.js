module.exports = {
    "get": {
        "security": [{ "authorization": [] }],
        "tags": [
            "USER"
        ],
        "summary": "User fetching by ID in system",
        "description": "User fetching by ID in system",
        "parameters": [{
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
        },{
            "description": "User fetching by ID in the system",
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