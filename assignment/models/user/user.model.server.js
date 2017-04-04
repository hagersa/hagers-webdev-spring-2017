module.exports = function () {

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByGoogleId: findUserByGoogleId
    };

    var mongoose = require('mongoose');
    var q = require('q');
    var bcrypt = require("bcrypt-nodejs");


    var UserSchema = require('./user.schema.server.js')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;

    // check code
    function findUserByGoogleId(googleId) {
        //var deferred = q.defer();
       return  UserModel
            .findOne({'google.id': googleId});//, function (err, user) {
            // if(err) {
            //     console.log("error in model.server findUserByGoogleId: "+user);
            //     deferred.reject(err); // reject
            // } else {
            //     console.log("in model.server findUserByGoogleId: "+user);
            //     deferred.resolve(user);
            // }
     //   });
        //return deferred.promise;
    }

    function createUser(user) {
        console.log("have new user in model.server: "+user);
        var deferred = q.defer();
        console.log(user);
        UserModel
            .create(user, function (err, user) {
                if(err) {
                    deferred.abort(err); // reject
                } else {
                    console.log("success creating user in model.server: "+user);
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

        console.log('in model'+username);
        var deferred = q.defer();
        UserModel
            .findOne({username: username}, function (err, user) {
                if(err) {
                    deferred.abort(err); // reject
                } else {
                    console.log("in model.server"+user);
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    // updated to check that the password is correct
    function findUserByCredentials(username, password) {

        var deferred = q.defer();
        UserModel
            .findOne({username: username}, function (err, user) {
            if(err) {
                console.log("error in model.server findUserByCredentials: "+ user);
                deferred.reject(err);
            } else {
                if(user && bcrypt.compareSync(password, user.password)) {
                    console.log("in model.server findUserByCredentials: "+ user);
                    deferred.resolve(user);
                } else {
                    console.log("in model.server error findUserByCredentials: "+ user);
                    deferred.reject(err);
                }
            }
            });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel
            .remove({_id: userId}, function (err, user) {
            deferred.resolve(user);
            });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        UserModel
            .update({_id : userId},
                {firstName : user.firstName,
                    lastName : user.lastName,
                    password : bcrypt.hashSync(user.password),
                    email : user.email},
                function (err, response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    }
};