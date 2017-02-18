(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function deleteWebsite (newId) {
            vm.websites = WebsiteService.deleteWebsite(newId);
            $location.url("/user/" + vm.userId + "/website");
        };

        function updateWebsite (newWebsite) {
            var website = WebsiteService.updateWebsite(vm.websiteId, newWebsite);
            if(website == null) {
                vm.error = "unable to update website";
            } else {
                vm.message = "website successfully updated"
            }
            $location.url("/user/" + vm.userId + "/website");
        }
    }
})();