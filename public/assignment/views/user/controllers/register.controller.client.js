(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location, $rootScope) {

        var vm = this;
        vm.registerUser = registerUser;

        function registerUser(user) {
            if (user.username && user.password) {
                if (user.password === user.password2) {
                UserService
                    .findUserByUsername(user.username)
                    .then(function (response) {
                        if (response.data != null) {
                            console.log("username already taken: " + response.data);
                            vm.error = "username already taken"
                        }
                        else {
                            console.log("here is the user before registering: " + user);
                            console.log("username: " + user.username + " and password: " + user.password);
                            UserService
                                .register(user)
                                .then(function (response) {
                                    if (response.data == null) {
                                        console.log("no success from register in register function");
                                        vm.error = "could not register";
                                    } else {
                                        console.log("success in register in register function");
                                        var newUser = response.data;
                                        console.log("have new user in registerUser" + newUser);
                                        $rootScope.currentUser = newUser;
                                        $location.url("/profile/" + newUser._id);
                                    }
                                });
                        }
                    });
                } else {
                    vm.error = "passwords must match";
                }
            } else {
                vm.error = "username and password required";
            }
        }
    }
})();