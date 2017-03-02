(function () {
    angular
        .module("WebAppMaker")
        .factory('PageService', pageService);

    function pageService($http) {
        // var pages = [
        //     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        //     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        //     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        // ];
        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage,
            "findAllPagesForWebsite": findAllPagesForWebsite
        };
        return api;

        function findAllPagesForWebsite(websiteId) {
            return $http.get("/api/website/"+websiteId+"/page");
        }

        function findPageById(pageId) {
            return $http.get("/api/page/"+pageId);
        }

        function createPage(websiteId, page) {
            return $http.post("/api/website/"+websiteId+"/page", page);
        }

        function updatePage(pageId, newPage) {
            return $http.put("/api/page/"+pageId, newPage);
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/"+pageId);
        }

        // I think this is unneccesary
        function findPageByWebsiteId(websiteId) {
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }
    }
})();