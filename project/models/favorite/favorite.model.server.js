module.exports = function (favoriteModel) {

    var api = {
        createFavorite: createFavorite, // ad favoriteId to a users favorites
        findAllFavoritesForUser: findAllFavoritesForUser, // return the list of favorites for a user
        findFavoriteById: findFavoriteById, // find a favorite object by its id
        updateFavorite: updateFavorite, // update a favorite object
        deleteFavoriteForUser: deleteFavoriteForUser // deletes favoriteId from user.favorites and userId from favorites.users
    };


    var mongoose = require('mongoose');
    var q = require('q');

    var FavoriteSchema = require('./favorite.schema.server.js')();
    var FavoriteModel = mongoose.model('FavoriteModel', FavoriteSchema);

    return api;

    function createFavorite () {

    }

    function findAllFavoritesForUser () {

    }

    function findFavoriteById () {

    }

    function updateFavorite () {

    }

    function deleteFavoriteForUser () {

    }

};
