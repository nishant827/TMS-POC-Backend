const mongoController = require("../../dbConfig/mongo.controller");

var taskHelper = {};

taskHelper.convertTechniciansIdToMongoId = (arrayOfTechnicians) => {
    return new Promise((resolve, reject) => {
        try {
            let arrayOfconvertedTechnicians = [];
            console.log(JSON.stringify(arrayOfTechnicians, null, 2));
            arrayOfTechnicians.forEach((technician, index) => {
                arrayOfconvertedTechnicians.push(mongoController.convertToObjectId(technician));
                if (index == arrayOfTechnicians.length - 1) {
                    resolve(arrayOfconvertedTechnicians);
                }
            });
        }
        catch (e) {
            reject(e);
        }
    });
}

taskHelper.getTaskListAggregateQuery = (query, usersCollectionName, queryParams) => {
    return [
        { $match: query },
        {
            $lookup: {
                from: usersCollectionName,
                localField: 'technicians',
                foreignField: "_id",
                as: "techniciansDetails"
            }
        },
        {
            $addFields: {
                techniciansDetails: {
                    $map: {
                        input: "$techniciansDetails",
                        as: "techniciansDetails",
                        in: {
                            _id: "$$techniciansDetails._id",
                            firstName: "$$techniciansDetails.firstName",
                            lastName: "$$techniciansDetails.lastName",
                            email: "$$techniciansDetails.email",
                            age: "$$techniciansDetails.age",
                            contactDetails: "$$techniciansDetails.contactDetails",
                            gender: "$$techniciansDetails.gender",
                            role: "$$techniciansDetails.role",
                            managerId: "$$techniciansDetails.managerId",
                        }
                    }
                },
            }
        },
        { $skip: +queryParams.offset ? +queryParams.offset : 0 },
        { $limit: +queryParams.limit ? +queryParams.limit : 10 },
        {
            $project: {
                "_id": 1, "towerId": 1, "address": 1, "taskType": 1, "taskTitle": 1, "taskDescription": 1, "startDate": 1, "estimatedEndDate": 1, "createdBy": 1, "techniciansDetails": 1
            }
        }
    ];
}

module.exports = taskHelper;