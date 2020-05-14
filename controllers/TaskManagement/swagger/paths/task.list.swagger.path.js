module.exports = {
    "get": {
        "security": [{ "authorization": [] }],
        "tags": [
            "Task"
        ],
        "summary": "Fetches all tasks in system",
        "description": "Fetches all tasks in system",
        "parameters": [{
            "description": "List of tasks that are available in the system",
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
                "description": "Tasks fetched successfully"
            },
            "500": {
                "description": "Error occured while fetching the Tasks"
            }
        }
    }
}