(function () {
    angular
        .module("Odhecaton")
        .factory('PageService', pageService);

    function pageService($http) {
        var api = {
            "createPage": createPage,
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
    }
})();

// This function is redundant, but was used in assignment3
//"findPageByWebsiteId": findPageByWebsiteId,
// function findPageByWebsiteId(websiteId) {
//     for(var p in pages) {
//         if(pages[p].websiteId === websiteId) {
//             return angular.copy(pages[p]);
//         }
//     }
//     return null;
// }