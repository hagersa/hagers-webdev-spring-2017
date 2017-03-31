(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location, $rootScope) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService
                .login(user)
                .then(
                    function (response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url('/profile');  //+ user._id
                    });
        }
    }


})();