module.exports = {
    "required": [
        "firstName",
        "lastName",
        "email",
        "password",
        "age",
        "mobileNumber",
        "gender",
        "role"
    ],
    "properties": {
        "firstName": {
            "type": "string",
            "uniqueItems": false
        },
        "lastName": {
            "type": "string",
            "uniqueItems": false
        },
        "email": {
            "type": "string",
            "example": "xyz@domain.com",
            "uniqueItems": true
        },
        "password": {
            "type": "string",
            "uniqueItems": false
        },
        "age": {
            "type": "number",
            "example": 20,
            "format": "int64",
            "uniqueItems": false
        },
        "contactDetails": {
            "type": "object",
            "properties": {
                "countryCode": {
                    "type": "string",
                    "example": "+91"
                },
                "mobileNo": {
                    "type": "string",
                    "example": "9999999999"
                },
            }
        },
        "gender": {
            "type": "string",
            "enum": ["M", "F", "O"],
            "default": "M",
            "uniqueItems": false
        },
        "role": {
            "type": "string",
            "enum": ["SA", "ZH", "TECH"],
            "default": "TECH",
            "uniqueItems": false
        },
    }
}