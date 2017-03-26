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
        }

        function createWebsite(website) {
            var newWebsite =
                {_user: vm.userId, name: vm.website.name, description: vm.website.description};

            WebsiteService
                .createWebsite(vm.userId, newWebsite)
                .success(function (response) {
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function () {
                    vm.error = "could not create website";
                });
        }
    }
})();