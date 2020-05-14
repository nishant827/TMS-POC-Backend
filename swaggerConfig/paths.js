module.exports = {
    "/user/register": require("../controllers/user/swagger/paths/user.register.swagger.path"),
    "/user/list":require("../controllers/user/swagger/paths/user.list.swagger.path"),
    "/user/update/{id}":require("../controllers/user/swagger/paths/user.update.swagger.path"),
    "/user/remove/{id}":require("../controllers/user/swagger/paths/user.remove.swagger.path"),
    "/login": require("../controllers/authorization/swagger/paths/authorization.swagger.path"),
    "/user/{id}":require("../controllers/user/swagger/paths/user.findone.swagger.path"),
}