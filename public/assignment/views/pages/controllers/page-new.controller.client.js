(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function init() {
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(renderPages);
        }
        init();

        function renderPages(pages) {
            vm.pages = pages;
        }

        function createPage(page) {
            var newPage =
                {_website: vm.websiteId, name: vm.page.name, description: vm.page.description};

            PageService
                .createPage(vm.websiteId, newPage)
                .success(function (response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId +"/page");
                })
                .error(function () {
                    vm.error = "could not create page";
                });
        }
    }
})();