module.exports = function () {

    var api = {
        createFavorite: createFavorite, // ad favoriteId to a users favorites
        // findAllFavoritesForUser: findAllFavoritesForUser, // return the list of favorites for a user
        findFavoriteByVideoId: findFavoriteByVideoId,
        findFavoriteById: findFavoriteById, // find a favorite object by its id
        findNewFavorites: findNewFavorites,
        updateFavorite: updateFavorite // update a favorite object
        // deleteFavoriteForUser: deleteFavoriteForUser // deletes favoriteId from user.favorites and userId from favorites.users
    };


    var mongoose = require('mongoose');
    var q = require('q');

    var FavoriteSchema = require('./favorite.schema.server.js')();
    var FavoriteModel = mongoose.model('FavoriteModel', FavoriteSchema);

    return api;

    function createFavorite(favorite) {
        // console.log("have new user in model.server: "+user);
        var deferred = q.defer();
        // console.log(user);
        FavoriteModel
            .create(favorite, function (err, response) {
                if(err) {
                    deferred.reject(err); // reject
                } else {
                    // console.log("success creating user in model.server: "+user);
                    deferred.resolve(response);
                }
            });
        return deferred.promise;
    }

    function findFavoriteById(favoriteId) {
        var deferred = q.defer();
        FavoriteModel
            .findById(favoriteId, function (err, favorite) {
                // check that promise is returned first
                deferred.resolve(favorite);
            });
        return deferred.promise;
    }

    function findFavoriteByVideoId(videoId) {

        // console.log('in model'+username);
        var deferred = q.defer();
        FavoriteModel
            .findOne({videoId: videoId}, function (err, favorite) {
                if(err) {
                    deferred.reject(err); // reject
                } else {
                    // console.log("in model.server"+user);
                    deferred.resolve(favorite);
                }
            });
        return deferred.promise;
    }

    function  findNewFavorites() {
        console.log("in model");
        //return FavoriteModel.find();
        var deferred = q.defer();

        FavoriteModel
            .find({"dateCreated":{$gte:new Date(Date.now() - 24*60*60 * 1000)}}, function (err, newFavorites) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(newFavorites);
            }
            });
        return deferred.promise;
    }

    function updateFavorite(favoriteId, favorite) {
        // console.log("in library.model.server");
        // console.log("library: "+library);
        // console.log("libraryId: "+libraryId);

        var deferred = q.defer();
        FavoriteModel
            .update({_id : favoriteId},
                {users: favorite.users},
                function (err, response) {
                    if(err) {
                        console.log("error in update function");
                        deferred.reject(err); // reject
                    } else {
                        console.log("success in update function");
                        deferred.resolve(response);
                    }

                });
        return deferred.promise;
    }

    // function findAllFavoritesForUser () {
    //
    // }

    // function deleteFavoriteForUser () {
    //
    // }

};
