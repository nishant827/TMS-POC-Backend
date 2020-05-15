module.exports = {
    "get": {
        "security": [{ "authorization": [] }],
        "tags": [
            "Task"
        ],
        "summary": "Task fetching by ID in system",
        "description": "Task fetching by ID in system",
        "parameters": [{
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
        },{
            "description": "Task fetching by ID in the system",
            "name":"Description",
            "schema": {
                "$ref": "#/definitions/Task"
            }
        }],
        "produces": [
            "application/json"
        ],
        "responses": {
            "200": {
                "description": "Task fetched successfully"
            },
            "500": {
                "description": "Error occured while fetching the Task"
            }
        }
    }
}