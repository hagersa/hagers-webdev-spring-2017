(function () {
    angular
        .module("Odhecaton")
        .factory('FavoriteService', FavoriteService);

    function FavoriteService($http) {
        var api = {
            "createFavorite": createFavorite,
            "findFavoriteById": findFavoriteById,
            "findFavoriteByVideoId": findFavoriteByVideoId,
            "updateFavorite": updateFavorite,
            "findNewFavorites": findNewFavorites,
            "findFavoritesForUser": findFavoritesForUser
            // "deleteFavoriteForUser": deleteFavoriteForUser,
        };
        return api;

        function findFavoriteByVideoId(videoId) {
            return $http.get("/api/favorite/?videoId="+videoId);
        }

        function findFavoriteById(favoriteId) {
            return $http.get("/api/favorite/"+favoriteId);
        }

        function createFavorite(favorite) {
            return $http.post("/api/favorite", favorite);
        }

        function updateFavorite(newFavorite) {
            return $http.put("/api/favorite", newFavorite);
        }

        function  findNewFavorites() {
            return $http.get("/api/new");
        }

        function findFavoritesForUser(userId) {
            return $http.get("/api/user/"+userId+"/favorites");
        }


        // function deleteFavoriteForUser(favoriteId) {
        //    return $http.delete("/api/favorite/"+favoriteId);
        // }
    }
})();