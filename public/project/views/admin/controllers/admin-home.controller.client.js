(function(){
    angular
        .module("Odhecaton")
        .controller("AdminHomeController", AdminHomeController);

    function AdminHomeController(OdhecatonUserService, $routeParams, $location, LibraryService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.unregisterUser = unregisterUser;
        vm.update = update;
        //vm.findAllUsers = findAllUsers;

        function init() {
            OdhecatonUserService
                .findUserById(vm.userId)
                .success(renderUser)
                .error(function () {
                    vm.error = "unable to update user";
                });

            OdhecatonUserService
                .findAllUsers()
                .success(renderUsers)
                .error(function () {
                    vm.error = "unable to update user";
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
                })
                .error(function () {
                    vm.error = 'unable to delete user';
                });
        }
    }
})();