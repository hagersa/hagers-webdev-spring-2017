(function(){
    angular
        .module("Odhecaton")
        .factory('OdhecatonUserService', odhecatonUserService);

    function odhecatonUserService($http) {

        var api = {
            //"users": users,
            "login": login,
            "logout": logout,
            "createUser": createUser,
            "register": register,
            "isAdmin": isAdmin,
            "findAllUsers": findAllUsers,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findFollowersForUser": findFollowersForUser,
            "findFollowingForUser": findFollowingForUser,
            "updateUser": updateUser,
            //"updatePassword": updatePassword,
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

        function findFollowersForUser(userId) {
            return $http.get("/api/user/followers/"+userId);
        }

        function findFollowingForUser(userId) {
            return $http.get("/api/user/following/"+userId);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        // function updatePassword(userId, password) {
        //     return $http.put("/api/user/"+userId, password);
        // }

        function deleteUser(userId) {
            return $http.delete("/api/user/" + userId);
        }

        function findAllUsers() {
            return $http.get('/api/admin/users');
                // .then(function (response) {
                //     return response.data;
                // });
        }

        function isAdmin() {
            return $http.post('/api/isAdmin');
                // .then(function (response) {
                //     return response.data;
                // });
        }
    }
})();