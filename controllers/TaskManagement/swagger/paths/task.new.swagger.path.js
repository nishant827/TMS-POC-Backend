module.exports = {
    "post": {
        "security": [{ "authorization": [] }],
        "tags": [
            "Task"
        ],
        "summary": "Creates a new task in system",
        "description": "Creates a new task in system",
        "parameters": [{
            "name": "task",
            "in": "body",
            "description": "Task that we want to create",
            "schema": {
                "$ref": "#/definitions/Task"
            }
        }],
        "produces": [
            "application/json"
        ],
        "responses": {
            "200": {
                "description": "New Task is created"
            },
            "500": {
                "description": "Error occured in creating task"
            }
        }
    }
}