module.exports = function () {

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
        // updateUser: updateUser,
        // deleteUser: deleteUser*/
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var UserSchema = require('./user.schema.server.js')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;

    function createUser(user) {
        var deferred = q.defer();
        console.log(user);
        UserModel
            .create(user, function (err, user) {
                if(err) {
                    deferred.abort(err); // reject
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel
            .findById(userId, function (err, user) {
                // check that promise is returned first
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel
            .find(username, function (err, user) {
                // check that promise is returned first
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        UserModel
            .find({username: username, password: password}, function (err, user) {
                // check that promise is returned first
                deferred.resolve(user);
            });
        return deferred.promise;
    }
    // function updateUser(userId, user) {
    //     return ;
    // }
    // function deleteUser(userId) {
    //     return ;
    // }*/
};
