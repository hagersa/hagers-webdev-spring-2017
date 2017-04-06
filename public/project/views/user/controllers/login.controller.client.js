// (function () {
//     angular
//         .module("Odhecaton")
//         .controller("loginController", loginController);
//
//     function loginController(UserService, $location, $rootScope) {
//         var vm = this;
//         vm.login = login;
//
//         function login(user) {
//             if (user.username && user.password) {
//                 UserService
//                     .login(user)
//                     .success(function (response) {
//                         var user = response.data;
//                         $rootScope.currentUser = user;
//                         $location.url('/profile');
//                     })
//                     .error(function () {
//                         console.log("error in login controller");
//                         vm.error = "user not found";
//                     });
//             } else {
//                 vm.error = "username and password required";
//             }
//         }
//     }
// })();
