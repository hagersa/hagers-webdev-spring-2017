(function () {
    angular
        .module("WebAppMaker")
        .factory('PageService', pageService);

    function pageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];
        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage,
            "findAllPagesForUser": findAllPagesForUser
        };
        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = (new Date()).getTime()+"";
            pages.push(page);
            return page;
        }

        function findPageByWebsiteId(websiteId) {
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function updatePage(pageId, newPage) {
            for(var p in pages) {
                var page = pages[p];
                if(page._id === pageId ) {
                    pages[p].name = newPage.name;
                    pages[p].description = newPage.description;

                    return angular.copy(page);
                }
            }
            return null;
        }

        function deletePage(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages.splice(p, 1);
                }
            }
            return pages;
        }

        function findAllPagesForUser(websiteId) {
            var _pages = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    _pages.push(pages[p]);
                }
            }
            return _pages;
        }
    }
})();