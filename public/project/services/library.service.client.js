(function () {
    angular
        .module("Odhecaton")
        .factory('LibraryService', libraryService);

    function libraryService($http) {

        var api = {
            "createLibrary": createLibrary,
            "findLibraryById": findLibraryById,
            "updateLibrary": updateLibrary,
            "deleteLibrary": deleteLibrary,
            "findAllDirLibrariesForUser": findAllDirLibrariesForUser,
            "findAllMemLibrariesForUser": findAllMemLibrariesForUser
            //"updateLibraryMembers": updateLibraryMembers
        };
        return api;

        function createLibrary(userId, library) {
            return $http.post("/api/user/"+userId+"/library", library);
        }

        function deleteLibrary(libraryId) {
            return $http.delete("/api/library/"+libraryId);
        }

        function findAllDirLibrariesForUser(userId) {
            return $http.get("/api/user/"+userId+"/dirLibrary");
        }

        function findAllMemLibrariesForUser(userId) {
            return $http.get("/api/user/"+userId+"/memLibrary");
        }

        function findLibraryById(libraryId) {
            return $http.get("/api/library/"+libraryId);
        }

        function updateLibrary(libraryId, newLibrary) {
            return $http.put("/api/library/"+libraryId, newLibrary);
        }

        // function updateLibraryMembers(libraryId, email) {
        //     return $http.put("/api/library/share/"+libraryId, email);
        // }
    }
})();