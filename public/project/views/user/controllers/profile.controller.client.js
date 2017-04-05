(function(){
    angular
        .module("Odhecaton")
        .controller("profileController", profileController);

    function profileController($routeParams, $location, $rootScope, UserService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.update = update;
        vm.unregisterUser = unregisterUser;
        vm.logout = logout;

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

        function logout(user) {
            console.log("have user in profile controller logout: "+user);
            UserService
                .logout(user)
                .then(function(response) {
                    $rootScope.currentUser = null;
                    console.log("sucess in profile controller logout");
                    $location.url("/");
                });
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