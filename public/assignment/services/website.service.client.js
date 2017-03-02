(function () {
    angular
        .module("WebAppMaker")
        .factory('WebsiteService', websiteService);

    function websiteService($http) {

        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite,
            "findAllWebsitesForUser": findAllWebsitesForUser
        };
        return api;

        function createWebsite(userId, website) {
            return $http.post("/api/user/"+userId+"/website", website);
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
        }

        function findAllWebsitesForUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
        }

        function findWebsiteById(websiteId) {
            return $http.get("/api/website/"+websiteId);
        }

        function updateWebsite(websiteId, newWebsite) {
            return $http.put("/api/website/"+websiteId, newWebsite);
        }
    }
})();

// This function is redundant, but was used in assignment3
//"findWebsitesByUser": findWebsitesByUser,
// function findWebsitesByUser(userId) {
//     for(var w in websites) {
//         if(websites[w].developerId === userId) {
//             return angular.copy(websites[w]);
//         }
//     }
//     return null;
// }