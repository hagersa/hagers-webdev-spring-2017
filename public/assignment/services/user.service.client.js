(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            "users": users,
            "createUser": createUser,
            "findUserByUserName": findUserByUserName,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById
            "updateUser": updateUser,
            "deleteUser": deleteUser,
        };
        return api;

        function createUser(user) {
            // do I need a line before this?
            user._id = (new Date()).getTime();
            userId = user._id; // do I need to do this?
            // how to set username and password from page?
            users.push(user);
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    users[u].username = newUser.username;
                    users[u].password = newUser.password;
                    return user;
                }
            }
            return null;
        }



        function findUserById(userId) {
            for(var u in users) {
                var user = users[u];
                if( user._id === userId) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for(var u in users) {
                var user = users[u];
                if( user._id === username) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username &&
                    user.password === password) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function updateUser(userId, user) { // newUser or user as param?
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    users[u].email = newUser.email;
                    return angular.copy(user); // or return user??
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for(var u in users) {
                var user = users[u];
                if( user._id === userId) {
                    users.splice(u, 1);
                }
            }
            return null;
        }


    }
})();