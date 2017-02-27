(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService($http) {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            "users": users,
            "createUser": createUser,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        } // returns a Promise

        function createUser(user) {
            return $http.post("/api/user", user);
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


// //server-side create user
// function createUser(user) {
//    var user._id = (new Date()).getTime()+"";
//    users.push(user);
//    return user;
//}

// //client-side delete user
// function deleteUser(userId) {
//     for(var u in users) {
//         var user = users[u];
//         if( user._id === userId) {
//             users.splice(u, 1);
//         }
//     }
// }

// client-side updateUser
// for(var u in users) {
//     var user = users[u];
//     if(user._id === userId ) {
//         users[u].firstName = newUser.firstName;
//         users[u].lastName = newUser.lastName;
//         users[u].email = newUser.email;
//         users[u].username = newUser.username;
//         users[u].password = newUser.password;
//         return angular.copy(user); // or return user??
//     }
// }
// return null;

// client-side findUserByCredentials
// function findUserByCredentials(username, password) {
//     for(var u in users) {
//        var user = users[u];
//        if( user.username === username &&
//           user.password === password) {
//           return angular.copy(user);
//       }
//   }
//   return null;
//}

// client-side findUserByUsername
// for(var u in users) {
//     var user = users[u];
//     if(user._id === username) {
//         return angular.copy(user);
//     }
// }
// return null;

// client-side findUserId
// for(var u in users) {
//     var user = users[u];
//     if( user._id === userId) {
//         return angular.copy(user);
//     }
// }
// return null;