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
                .then(function (user) {
                    vm.error = "username already taken"
                }, function () {
                    console.log(user);
                    UserService
                        .createUser(user)
                        .success(function (user) {
                            console.log(user);
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
