(function () {
    angular
        .module("Odhecaton")
        .factory('LibraryService', libraryService);

    function libraryService($http) {

        var api = {
            //"createWebsite": createWebsite,
            //"findWebsiteById": findWebsiteById,
            //"updateWebsite": updateWebsite,
            //"deleteWebsite": deleteWebsite,
            "findAllLibrariesForUser": findAllLibrariesForUser
        };
        return api;

        // function createWebsite(userId, website) {
        //     return $http.post("/api/user/"+userId+"/website", website);
        // }
        //
        // function deleteWebsite(websiteId) {
        //     return $http.delete("/api/website/"+websiteId);
        // }

        function findAllLibrariesForUser(userId) {
            return $http.get("/api/user/"+userId+"/library");
        }

        // function findWebsiteById(websiteId) {
        //     return $http.get("/api/website/"+websiteId);
        // }
        //
        // function updateWebsite(websiteId, newWebsite) {
        //     return $http.put("/api/website/"+websiteId, newWebsite);
        // }
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