(function () {
    angular
        .module("Odhecaton")
        .controller("loginController", loginController);

    function loginController(OdhecatonUserService, $location, $rootScope) {
        var vm = this;
        vm.login = login;

        function login(user) {
            console.log("have user in login controller: "+user);
            if (user && user.username && user.password) {
                OdhecatonUserService
                    .login(user)
                    .then(function (response) {
                        if (response.data == null) {
                            console.log("no success from login in login function");
                            vm.error = "could not login";
                        } else {
                            console.log("success in register in  login function");
                            var newUser = response.data;
                            console.log("have new user in loginUser" + newUser);
                            $rootScope.currentUser = newUser;
                            $location.url("/user/" + newUser._id + "/profile");
                        }
                    });
                    // .success(function (response) {
                    //     if (response.data == null) {
                    //         console.log("no success from login in login function");
                    //         vm.error = "could not login";
                    //     } else {
                    //         console.log("success in login in login function");
                    //         var newUser = response.data;
                    //         console.log("have new user in login" + newUser);
                    //         $rootScope.currentUser = newUser;
                    //         $location.url("/user/" + newUser._id + "/profile");
                    //     }
                    // })
                    // .error(function() {
                    //     console.log("error in login controller");
                    //     vm.error = "user not found";
                    // });
            } else {
                vm.error = "username and password required";
            }
        }
    }
})();
