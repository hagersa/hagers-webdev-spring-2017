(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            // show waiting gif
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise
                .success(function (user) {
                    // hide waiting gif
                    var loginUser = user[0];
                    if(loginUser != null) {
                        $location.url('/profile/' + loginUser._id);
                    } else {
                        vm.error = 'user not found';
                    }
                })
                .error(function(err) {
                    vm.error = 'user does not exist';
                });
        }
    }
})();