module.exports = {
    "delete": {
        "security": [{ "authorization": [] }],
        "tags": [
            "Task"
        ],
        "summary": "Deletes a task in system",
        "description": "Deletes a task in system",
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
                "description": "Task deleted successfully"
            },
            "500": {
                "description": "Error occured in deleting task"
            }
        }
    }
}