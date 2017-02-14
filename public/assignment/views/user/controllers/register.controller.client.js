(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function resgisterController(UserService, $location) {
            var vm = this;
            vm.register = register;

            function register(newUser) {
                var user = UserService.createUser(newUser);
                if(user != null) {
                    $location.url('#/profile/' + user._id);
                }
                else {
                    vm.error = 'user not found';
                }
            }

            console.log(user);
    }
})();