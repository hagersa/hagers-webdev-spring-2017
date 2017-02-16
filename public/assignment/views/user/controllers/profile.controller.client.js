(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams.uid;
        function init() {
            vm.user = UserService.findUserById(userId);
            console.log(vm.user);
        }
        init();

        vm.update = function (newUser) {
          var user = UserService.updateUser(userId, newUser);
          if(user == null) {
              vm.error = "unable to update user";
          } else {
              vm.message = "user successfully updated"
          }
        };
    }
})();
