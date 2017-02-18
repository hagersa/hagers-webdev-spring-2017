(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            vm.pages = PageService.findAllPagesForUser(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function deletePage (newId) {
            vm.pages = PageService.deletePage(newId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };

        function updatePage (newPage) {
            var page = PageService.updatePage(vm.pageId, newPage);
            if(page == null) {
                vm.error = "unable to update page";
            } else {
                vm.message = "page successfully updated"
            }
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId +"/page");
        }
    }
})();