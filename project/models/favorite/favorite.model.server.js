module.exports = function (odhecatonUserModel) {

    var api = {
        createFavorite: createFavorite, // ad favoriteId to a users favorites
        findFavoriteByVideoId: findFavoriteByVideoId,
        findFavoriteById: findFavoriteById, // find a favorite object by its id
        findFavoritesForUser:  findFavoritesForUser,
        findAllFavorites: findAllFavorites,
        findNewFavorites: findNewFavorites,
        updateFavorite: updateFavorite // update a favorite object
    };


    var mongoose = require('mongoose');
    var q = require('q');

    var FavoriteSchema = require('./favorite.schema.server.js')();
    var FavoriteModel = mongoose.model('FavoriteModel', FavoriteSchema);

    return api;

    function createFavorite(favorite) {

        var deferred = q.defer();

        FavoriteModel
            .create(favorite, function (err, response) {
                if(err) {
                    deferred.reject(err); // reject
                } else {
                    deferred.resolve(response);
                }
            });
        return deferred.promise;
    }

    function findFavoriteById(favoriteId) {
        var deferred = q.defer();
        FavoriteModel
            .findById(favoriteId, function (err, favorite) {
                deferred.resolve(favorite);
            });
        return deferred.promise;
    }

    function findFavoriteByVideoId(videoId) {

        var deferred = q.defer();
        FavoriteModel
            .findOne({videoId: videoId}, function (err, favorite) {
                if(err) {
                    deferred.reject(err); // reject
                } else {
                    deferred.resolve(favorite);
                }
            });
        return deferred.promise;
    }

    function findAllFavorites(favoriteIds) {
        // console.log("Have libraryIds in findAllDirLibraries in model.server: "+libraryIds);

        var deferred = q.defer();

        FavoriteModel
            .find({'_id': { $in: favoriteIds}}, function(err, favoriteObjects) {
                if(err) {
                    deferred.reject(err); // reject
                } else {
                    deferred.resolve(favoriteObjects);
                }
            });
        return deferred.promise;
    }

    function  findFavoritesForUser(userId) {
            var deferred = q.defer();

            odhecatonUserModel
                .findUserById(userId)
                .then(function (user) {
                    var favoriteIds = user.favorites;

                    deferred.resolve(favoriteIds);
                }, function (error) {
                    console.log("error in model finding user");

                });
            return deferred.promise;
        }

    function  findNewFavorites() {
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
        var deferred = q.defer();
        FavoriteModel
            .update({_id : favoriteId},
                {users: favorite.users},
                function (err, response) {
                    if(err) {
                        deferred.reject(err); // reject
                    } else {
                        deferred.resolve(response);
                    }

                });
        return deferred.promise;
    }
};
