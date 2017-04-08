(function(){
    angular
        .module("Odhecaton")
        .controller("LibraryHomeController", LibraryHomeController);

    function LibraryHomeController($routeParams, $location, LibraryService) {
        var vm = this;
        //var userId = $routeParams.uid;
        vm.userId = $routeParams.uid;

        function init() {
            LibraryService
                .findAllLibrariesForUser(vm.userId)
                //.success(renderWebsites);
                .success(function (response) {
                    console.log(vm.userId);
                    console.log(response);
                    vm.libraries = response;
                })
                .error(function () {
                    vm.error = 'could not render libraries';
                });
        }
        init();

        // function renderWebsites(websites) {
        //     vm.websites = websites;
        // }
    }
})();