(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location) {
            var vm = this;
            vm.register = register;

            function register(newUser) {
                var user = UserService.createUser(newUser);

                $location.url('/profile/' + user._id);
            }
    }
})();