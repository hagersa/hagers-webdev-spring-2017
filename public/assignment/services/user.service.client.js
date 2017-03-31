(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService($http) {

        var api = {
            //"users": users,
            "login": login,
            "logout": logout,
            "createUser": createUser,
            "register": register,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function login(user) {
            console.log("have user in service.client: "+user);
            return $http.post("/api/login", user);
        }

        function logout(user) {
            console.log("have user in logout service.client: "+user);
            return $http.post("/api/logout");
        }

        function findUserByCredentials(username, password) {
            console.log(username, password);
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user/?username="+username);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/" + userId);
        }
    }
})();