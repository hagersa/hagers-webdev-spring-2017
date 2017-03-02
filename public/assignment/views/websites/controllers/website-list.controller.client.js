(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        //var userId = $routeParams.uid;
        vm.userId = $routeParams.uid;

        function init() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(renderWebsites);
        }
        init();

        function renderWebsites(websites) {
            vm.websites = websites;
            console.log(websites);
        }
    }
})();