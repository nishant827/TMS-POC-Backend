module.exports = {
    "required": [
        "towerId",
        "techinicians",
        "address",
        "taskType",
        "taskTitle",
        "taskDescription",
        "startDate",
        "estimatedEndDate"
    ],
    "properties": {
        "towerId": {
            "type": "string",
            "uniqueItems": false
        },
        "technicians": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/User"
            },
            "uniqueItems": false
        },
        "address": {
            "type": "string",
            "uniqueItems": true
        },
        "taskType": {
            "type": "string",
            "uniqueItems": false
        },
        "taskTitle": {
            "type": "string",
            "uniqueItems": false
        },
        "taskDescription": {
            "type": "string",
            "uniqueItems": false
        },
        "startDate": {
            "type": "string",
            "format": "date",
            "uniqueItems": false
        },
        "estimatedEndDate": {
            "type": "string",
            "format": "date",
            "uniqueItems": false
        }
    }
}