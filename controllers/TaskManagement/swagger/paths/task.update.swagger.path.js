module.exports = {
    "put": {
        "security": [{ "authorization": [] }],
        "tags": [
            "Task"
        ],
        "summary": "Updates a task in system",
        "description": "Updates a task in system",
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
                "description": "Task that we want to update",
                "schema": {
                    "$ref": "#/definitions/Task"
                }
            }
        ],
        "produces": [
            "application/json"
        ],
        "responses": {
            "200": {
                "description": "Task updated successfully"
            },
            "500": {
                "description": "Error occured in updating task"
            }
        }
    }
}