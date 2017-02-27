(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location) {

        var vm = this;
        vm.registerUser = registerUser;

        function registerUser(user) {
            UserService
                .findUserByUsername(user.username)
                .success(function (user) {
                    vm.error = "username already taken"
                })
                .error(function () {
                    UserService
                        .createUser(user)
                        .success(function (user) {
                            $location.url('/profile/' + user._id);
                        })
                        .error(function () {
                            vm.error = "could not register";
                        });

                });
        }
    }
})();

// client-side register function
// function registerUser(newUser) {
//     var user = UserService.createUser(newUser);
//
//     $location.url('/profile/' + user._id);
// }
