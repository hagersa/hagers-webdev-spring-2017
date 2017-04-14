(function(){
    angular
        .module("Odhecaton")
        .controller("profileController", profileController);

    function profileController($routeParams, $location, $rootScope, OdhecatonUserService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.update = update;
        vm.unregisterUser = unregisterUser;
        //vm.updatePassword = updatePassword;
        vm.logout = logout;

        function init() {
            OdhecatonUserService
                .findUserById(userId)
                .success(renderUser);
        }
        init();

        function renderUser(user) {
            // console.log("in profile render function: "+user);
            vm.user = user;
            // console.log(user);
        }

        function logout(user) {
            console.log("have user in profile controller logout: "+user);
            OdhecatonUserService
                .logout(user)
                .then(function(response) {
                    $rootScope.currentUser = null;
                    console.log("sucess in profile controller logout");
                    $location.url("/");
                });
        }

        function  update(newUser) {
            OdhecatonUserService
                .updateUser(userId, newUser)
                .success(function (response) {
                    vm.message = "user successfully updated"
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
        }

        // function  updatePassword(password) {
        //     OdhecatonUserService
        //         .updatePassword(userId, password)
        //         .success(function (response) {
        //             console.log("success in password updation");
        //             vm.message = "password successfully updated"
        //         })
        //         .error(function () {
        //             console.log("error in password updation");
        //             vm.error = "unable to update password";
        //         });
        // }

        function unregisterUser(user) {
            var answer = confirm("Are you sure?");
            // console.log(answer);
            if(answer) {
                OdhecatonUserService
                    .deleteUser(user._id)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = 'unable to delete user';
                    });
            }
        }
    }
})();