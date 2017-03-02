(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(renderWebsites);
        } init();

        function renderWebsites(websites) {
            vm.websites = websites;
            console.log(websites);
        }

        function createWebsite(website) {
            WebsiteService
                .createWebsite(vm.userId, website)
                .success(function (website) {
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function () {
                    vm.error = "could not create website";
                });
        }
    }
})();

// client-side createWebsite
// var website = WebsiteService.createWebsite(vm.userId, website);
// $location.url("/user/" + vm.userId + "/website");

