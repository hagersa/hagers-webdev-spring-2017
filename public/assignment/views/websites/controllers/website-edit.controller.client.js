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
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(renderWebsites);
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(renderWebsite);
        }
        init();

        function renderWebsites(websites) {
            vm.websites = websites;
            console.log(websites);
        }

        function renderWebsite(website) {
            vm.website = website;
            console.log(website);
        }

        function deleteWebsite (websiteId) {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                WebsiteService
                    .deleteWebsite(websiteId)
                    .success(function () {
                        $location.url("/user/"+vm.userId+"/website");
                    })
                    .error(function () {
                        vm.error = 'unable to delete website';
                    });
            }
        }

        function updateWebsite (newWebsite) {
            WebsiteService
                .updateWebsite(vm.websiteId, newWebsite)
                .success(function (response) {
                    $location.url("/user/" + vm.userId + "/website");
                    //vm.message = "website successfully updated"
                })
                .error(function () {
                    vm.error = "unable to update website";
                });
        }
    }
})();