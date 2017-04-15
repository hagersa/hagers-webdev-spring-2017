module.exports = function (odhecatonUserModel) {

    var api = {
        createFavorite: createFavorite, // ad favoriteId to a users favorites
        // findAllFavoritesForUser: findAllFavoritesForUser, // return the list of favorites for a user
        findFavoriteByVideoId: findFavoriteByVideoId,
        findFavoriteById: findFavoriteById, // find a favorite object by its id
        findFavoritesForUser:  findFavoritesForUser,
        findAllFavorites: findAllFavorites,
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

    function findAllFavorites(favoriteIds) {
        // console.log("Have libraryIds in findAllDirLibraries in model.server: "+libraryIds);

        var deferred = q.defer();

        FavoriteModel
            .find({'_id': { $in: favoriteIds}}, function(err, favoriteObjects) {
                // console.log("Found Library objects in model.server: "+libraryObjects);

                if(err) {
                    console.log("error in model");
                    deferred.reject(err); // reject
                } else {
                    console.log("favoriteObjects: "+favoriteObjects);
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
                    // console.log("found user in findAllLibrariesForUser in model.server"+user);
                    var favoriteIds = user.favorites;
                    /// / console.log("found libraryIds in findAllDirLibrariesForUser in model.server"+libraryIds);
                    deferred.resolve(favoriteIds);
                }, function (error) {
                    console.log("error in model finding user");

                });
            return deferred.promise;
        }
        // var deferred = q.defer();
        //
        // var favoriteIds = user.favorites;
        // var favoriteObjects = [];
        //
        // for(var f in favoriteIds) {
        //     FavoriteModel
        //         .findById(favoriteIds[f], function (err, favorite) {
        //             favoriteObjects.push(favorite);
        //         });
        // }
        // deferred.resolve(favoriteObjects);
        // return deferred.promise;

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
