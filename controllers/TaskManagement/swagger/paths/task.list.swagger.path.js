module.exports = {
    "get": {
        "security": [{ "authorization": [] }],
        "tags": [
            "Task"
        ],
        "summary": "Fetches all tasks in system",
        "description": "Fetches all tasks in system",
        "parameters": [
            {
                "name": "offset",
                "in": "query",
                "required": true,
                "type": "number"
            },
            {
                "name": "limit",
                "in": "query",
                "required": true,
                "type": "number"
            }, {
                "description": "List of tasks that are available in the system",
                "name": "Description",
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
                "description": "Tasks fetched successfully"
            },
            "500": {
                "description": "Error occured while fetching the Tasks"
            }
        }
    }
}