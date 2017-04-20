module.exports = function () {

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findFollowersForUser: findFollowersForUser,
        findFollowingForUser: findFollowingForUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findEmailForUser: findEmailForUser,
        updateUser: updateUser,
        //updatePassword: updatePassword,
        deleteUser: deleteUser,
        findUserByGoogleId: findUserByGoogleId
    };

    var mongoose = require('mongoose');
    var q = require('q');
    var bcrypt = require("bcrypt-nodejs");

    var OdhecatonUserSchema = require('./user.schema.server.js')();
    var OdhecatonUserModel = mongoose.model('OdhecatonUserModel', OdhecatonUserSchema);

    return api;

    function createUser(user) {
        // console.log("have new user in model.server: "+user);
        var deferred = q.defer();
        // console.log(user);
        OdhecatonUserModel
            .create(user, function (err, user) {
                if(err) {
                    deferred.reject(err); // reject
                } else {
                    // console.log("success creating user in model.server: "+user);
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findAllUsers() {
        return OdhecatonUserModel.find();
    }

    function findFollowersForUser(followersIds) {
        // console.log("Have libraryIds in findAllDirLibraries in model.server: "+libraryIds);

        var deferred = q.defer();

        OdhecatonUserModel
            .find({'_id': { $in: followersIds}}, function(err, followersObjects) {
                // console.log("Found Library objects in model.server: "+libraryObjects);

                if(err) {
                    deferred.reject(err); // reject
                } else {
                    deferred.resolve(followersObjects);
                }
            });
        return deferred.promise;
    }

    function findFollowingForUser(followingIds) {
        // console.log("Have libraryIds in findAllDirLibraries in model.server: "+libraryIds);

        var deferred = q.defer();

        OdhecatonUserModel
            .find({'_id': { $in: followingIds}}, function(err, followingObjects) {
                // console.log("Found Library objects in model.server: "+libraryObjects);

                if(err) {
                    deferred.reject(err); // reject
                } else {
                    deferred.resolve(followingObjects);
                }
            });
        return deferred.promise;
    }

    function findUserByGoogleId(googleId) {
        // console.log("have googleID in model: "+googleId);
        return  OdhecatonUserModel
            .findOne({'google.id': googleId});//, function (err, user) {
    }

    function findUserById(userId) {
        var deferred = q.defer();
        OdhecatonUserModel
            .findById(userId, function (err, user) {
                // check that promise is returned first
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function findEmailForUser(userId) {
        var deferred = q.defer();
        OdhecatonUserModel
            .findById(userId, function (err, user) {
                // console.log(user);
                var email = user.email;
                // console.log(email);
                deferred.resolve(email);
            });
        return deferred.promise;
    }

    function findUserByUsername(username) {

        // console.log('in model'+username);
        var deferred = q.defer();
        OdhecatonUserModel
            .findOne({username: username}, function (err, user) {
                if(err) {
                    deferred.reject(err); // reject
                } else {
                    // console.log("in model.server"+user);
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    // updated to check that the password is correct
    function findUserByCredentials(username, password) {
        // console.log("in model.server: "+username);
        // console.log("in model.server: "+password);
        // console.log("in model.server: "+bcrypt.hashSync(password));

        var deferred = q.defer();
        OdhecatonUserModel
            .findOne({username: username}, function (err, user) {
            // console.log("err: "+err);
            // console.log("user: "+user);
            //     console.log("in model.server: "+bcrypt.compareSync(password, user.password));

            if (user && (user != null)) {
                if(user && bcrypt.compareSync(password, user.password)) {  //&& bcrypt.compareSync(password, user.password
                    // console.log("in model.server findUserByCredentials: "+ user);
                    deferred.resolve(user);
                } else {
                    // console.log("error1 in model.server findUserByCredentials: "+ user);
                    deferred.reject(err);
                }
            } else if(err) {
                // console.log("error2 in model.server findUserByCredentials: "+ user);
                deferred.reject(err);
            } else {
                deferred.reject(err);
            }


            // if(err) {
            //     console.log("error1 in model.server findUserByCredentials: "+ user);
            //     deferred.reject(err);
            // } else {
            //     if(user && bcrypt.compareSync(password, user.password)) {  //&& bcrypt.compareSync(password, user.password
            //         console.log("in model.server findUserByCredentials: "+ user);
            //         deferred.resolve(user);
            //     } else {
            //         console.log("error2 in model.server findUserByCredentials: "+ user);
            //         deferred.reject(err);
            //     }
            // }
            });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        OdhecatonUserModel
            .remove({_id: userId}, function (err, user) {
            deferred.resolve(user);
            });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();

        var updatedPassword;
        var bcrypted = bcrypt.hashSync(user.password);

        // if password hasn't been updated, don't hash it again
        if(user.password.length > 20) {
            updatedPassword = user.password;
        } else {
            updatedPassword = bcrypted;
        }



        OdhecatonUserModel
            .update({_id : userId},
                {firstName : user.firstName,
                    lastName : user.lastName,
                    aboutMe: user.aboutMe,
                    role: user.role,
                    password: updatedPassword,
                    email : user.email,
                    followers: user.followers,
                    following: user.following,
                    favorites: user.favorites},
                function (err, response) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(response);
                    }
                });
        return deferred.promise;
    }


    // function updatePassword(userId, password) {
    //     var deferred = q.defer();
    //
    //     var bcrypted = bcrypt.hashSync(password);
    //
    //     console.log("non encrypted password: "+password);
    //     console.log("encrypted password: "+bcrypted);
    //
    //     OdhecatonUserModel
    //         .update({_id : userId},
    //             { password : bcrypted },
    //             function (err, response) {
    //                 if(err) {
    //                     console.log("error updating password in model");
    //                     deferred.reject(err); // reject
    //                 } else {
    //                     console.log("success updating password in model: "+bcrypted);
    //                     deferred.resolve(response);
    //                 }
    //             });
    //     return deferred.promise;
    // }
};