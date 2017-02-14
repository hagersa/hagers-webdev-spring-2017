(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websites = WebsiteService.findAllWebsitesForUser();
    }
})