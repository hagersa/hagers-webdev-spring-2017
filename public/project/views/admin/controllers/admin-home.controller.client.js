(function(){
    angular
        .module("Odhecaton")
        .controller("AdminHomeController", AdminHomeController);

    function AdminHomeController(OdhecatonUserService, $routeParams, $location, LibraryService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.unregisterUser = unregisterUser;
        vm.update = update;
        vm.newUser;
        vm.createUser = createUser;
        //vm.findAllUsers = findAllUsers;

        function init() {
            OdhecatonUserService
                .findUserById(vm.userId)
                .success(renderUser)
                .error(function () {
                    vm.error = "unable to find user";
                });

            OdhecatonUserService
                .findAllUsers()
                .success(renderUsers)
                .error(function () {
                    vm.error = "unable to render users";
                });

        } init();

        function renderUser(user) {
            vm.user = user;
        }

        function renderUsers(users) {
            vm.users = users;
        }

        function update(user) {
            console.log(user);
            console.log(user.password);
            console.log(user._id);
            var tempUserId = user._id;
            OdhecatonUserService
                .updateUser(tempUserId, user)
                .success(function (response) {
                    vm.message = "user successfully updated";
                    OdhecatonUserService
                        .findAllUsers()
                        .success(renderUsers)
                        .error(function () {
                            vm.error = "unable to render users";
                        });
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
        }

        // function findAllUsers() {
        //     // OdhecatonUserService
        //     //     .findUserById(vm.userId)
        //     //     .success(function (response) {
        //             OdhecatonUserService
        //                 .findAllUsers()
        //                 .then(renderUsers);
        //         // })
        //         // .error(function () {
        //         //     vm.error = "coudn't render users";
        //         // });
        // }

        function unregisterUser(user) {
            OdhecatonUserService
                .deleteUser(user._id)
                .success(function () {
                    vm.message = 'user deleted';
                    OdhecatonUserService
                        .findAllUsers()
                        .success(renderUsers)
                        .error(function () {
                            vm.error = "unable to render users";
                        });
                })
                .error(function () {
                    vm.error = 'unable to delete user';
                });
        }

        function createUser(user, role) {
            if (user.username && user.password) {
                user.role = role;
                    OdhecatonUserService
                        .findUserByUsername(user.username)
                        .then(function (response) {
                            if (response.data != null) {
                                //console.log("username already taken: " + response.data);
                                vm.error = "username already taken"
                            }
                            else {
                                //console.log("here is the user before registering: " + user);
                                //console.log("username: " + user.username + " and password: " + user.password);
                                OdhecatonUserService
                                    .register(user)
                                    .then(function (response) {
                                        if (response.data == null) {
                                            //console.log("no success from register in register function");
                                            vm.error = "could not register";
                                        } else {
                                            //console.log("success in register in register function");
                                            //var newUser = response.data;
                                            //console.log("have new user in registerUser" + newUser);
                                            //$rootScope.currentUser = newUser;
                                            vm.message = "user successfully created";
                                            OdhecatonUserService
                                                .findAllUsers()
                                                .success(renderUsers)
                                                .error(function () {
                                                    vm.error = "unable to render users";
                                                });
                                        }
                                    });
                            }
                        });
            } else {
                vm.error = "username and password required";
            }
        }
    }
})();