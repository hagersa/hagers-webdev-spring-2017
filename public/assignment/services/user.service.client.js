(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService() { // Note from class: function userService($https) {
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
            "findUserById": findUserById,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
        };
        return api;

        function createUser(user) {
            user._id = (new Date()).getTime()+"";
            users.push(user);
            return user;
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

        function findUserByUserName(username) {
            for(var u in users) {
                var user = users[u];
                if(user._id === username) {
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

        // Notes from class
        // reimplementation using server
        //function findUserByCredentials(username, password) {
        //    return $https.get("/api/user?username="+username+"&password+"+password); // insert morning??
        //} // returns a Promise

        function updateUser(userId, newUser) {
            for(var u in users) {
                var user = users[u];
                if(user._id === userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    users[u].email = newUser.email;
                    users[u].username = newUser.username;
                    users[u].password = newUser.password;
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
        }


    }
})();