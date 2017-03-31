(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location, $rootScope) {

        var vm = this;
        vm.registerUser = registerUser;

        function registerUser(user) {
                UserService
                    .findUserByUsername(user.username)
                    .then(function (response) {
                        if(response.data != null)
                        {
                            console.log("username already taken: "+response.data);
                            vm.error = "username already taken"
                        }
                        else {
                            console.log("here is the user before registering: "+user);
                            console.log("username: "+user.username+" and password: "+user.password);
                            UserService
                                .register(user)
                                .then(function(response) {
                                    if (response.data == null) {
                                        console.log("no success from register in register function");
                                        vm.error = "could not register";
                                    } else {
                                        console.log("success in register in register function");
                                        var newUser = response.data;
                                        console.log("have new user in registerUser" + newUser);
                                        $rootScope.currentUser = newUser;
                                        $location.url("/profile/" + newUser._id);
                                    }});
                        }
                    });
            }

        // function registerUser(user) {
        //     UserService
        //         .findUserByUsername(user.username)
        //         .then(function (response) {
        //             if(response.data != null)
        //             {
        //                 console.log(response.data);
        //                 vm.error = "username already taken"
        //             }
        //             else {
        //                 console.log(user);
        //                 UserService
        //                     .createUser(user)
        //                     .success(function (user) {
        //                         console.log(user);
        //                         $location.url('/profile/' + user._id);
        //                     })
        //                     .error(function () {
        //                         vm.error = "could not register";
        //                     });
        //             }
        //         });
        // }
    }
})();