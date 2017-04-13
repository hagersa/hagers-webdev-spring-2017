(function(){
    angular
        .module("Odhecaton")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController(OdhecatonUserService, $routeParams, $location, LibraryService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.libraryId = $routeParams.lid;

        function init() {
            OdhecatonUserService
                .findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                })
                .error(function () {
                    vm.error = 'could not find user'
                });
        } init();
    }
})();