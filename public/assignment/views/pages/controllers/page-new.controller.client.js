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
            //console.log(pages);
        }

        function createPage(page) {
            PageService
                .createPage(vm.websiteId, page)
                .success(function (page) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId +"/page");
                })
                .error(function () {
                    vm.error = "could not create page";
                });
        }
    }
})();