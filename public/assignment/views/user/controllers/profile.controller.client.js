(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, $location, UserService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.update = update;
        vm.unregisterUser = unregisterUser;

        function init() {
            UserService
                .findUserById(userId)
                .success(renderUser);
        }
        init();

        function renderUser(user) {
            vm.user = user;
            console.log(user);
        }

        function  update(newUser) {
            UserService
                .updateUser(userId, newUser)
                .success(function (response) {
                    vm.message = "user successfully updated"
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
        }

        function unregisterUser(user) {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                UserService
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


// alternate init() function
// function init() {
//     UserService
//         .findUserById(userId)
//         .success(function (response) {
//         vm.user = response;
//         console.log(vm.user);
//         })
// }
// init();

// client-side update functions
// var user = UserService.updateUser(userId, newUser);
// if(user == null) {
//     vm.error = "unable to update user";
// } else {
//     vm.message = "user successfully updated"
// }