(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, $location, WebsiteService) {
        var vm = this;
        //var userId = $routeParams.uid;
        vm.userId = $routeParams.uid;
        //vm.websites = [];

        function init() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                //.success(renderWebsites);
                .success(function (response) {
                    console.log(vm.userId);
                    console.log(response);
                    vm.websites = response;
                })
                .error(function () {
                    vm.error = 'could not render websites';
                });
        }
        init();

        // function renderWebsites(websites) {
        //     vm.websites = websites;
        // }
    }
})();