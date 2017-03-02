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
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(renderPages);
            PageService
                .findPageById(vm.pageId)
                .success(renderPage);
        }
        init();

        function renderPages(pages) {
            vm.pages = pages;
            //console.log(pages);
        }

        function renderPage(page) {
            vm.page = page;
            console.log(page);
        }

        function deletePage (pageId) {
            var answer = confirm("Are you sure?");
            //console.log(answer);
            if(answer) {
                PageService
                    .deletePage(pageId)
                    .success(function () {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    })
                    .error(function () {
                        vm.error = 'unable to delete page';
                    });
            }
        }

        function updatePage (newPage) {
            PageService
                .updatePage(vm.pageId, newPage)
                .success(function (response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId +"/page");
                    //vm.message = "page successfully updated"
                })
                .error(function () {
                    vm.error = "unable to update page";
                });
        }
    }
})();