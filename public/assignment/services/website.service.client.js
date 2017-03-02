(function () {
    angular
        .module("WebAppMaker")
        .factory('WebsiteService', websiteService);

    function websiteService($http) {
        // var websites = [
        //     { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
        //     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
        //     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
        //     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
        //     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
        //     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }
        // ];
        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
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

        // this seems unneccessary
        function findWebsitesByUser(userId) {
            for(var w in websites) {
                if(websites[w].developerId === userId) {
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }
    }
})();

// client-side findAllWebsitesForUser
// var _sites = [];
// for(var w in websites) {
//     if(websites[w].developerId === userId) {
//         _sites.push(websites[w]);
//     }
// }
// return _sites;

// client-side findWebsiteById
// for(var w in websites) {
//     if(websites[w]._id === wid) {
//         return angular.copy(websites[w]);
//     }
// }
// return null;

// client-side updateWebsite

// client-side deleteWebsite
// for(var w in websites) {
//     if(websites[w]._id === websiteId) {
//         websites.splice(w, 1);
//     }
// }
// return websites;