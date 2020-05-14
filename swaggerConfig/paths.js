module.exports = {
    "/user/register": require("../controllers/user/swagger/paths/user.register.swagger.path"),
    "/user/list": require("../controllers/user/swagger/paths/user.list.swagger.path"),
    "/user/update/{id}": require("../controllers/user/swagger/paths/user.update.swagger.path"),
    "/user/remove/{id}": require("../controllers/user/swagger/paths/user.remove.swagger.path"),
    "/user/search": require("../controllers/user/swagger/paths/user.search.swagger.path"),
    "/user/{id}": require("../controllers/user/swagger/paths/user.findOne.swagger.path"),
    "/login": require("../controllers/authorization/swagger/paths/authorization.swagger.path"),

    "/task/new": require("../controllers/TaskManagement/swagger/paths/task.new.swagger.path"),
    "/task/list":require("../controllers/TaskManagement/swagger/paths/task.list.swagger.path")
}