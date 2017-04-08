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

    var OdhecatonUserSchema = require('./user.schema.server.js')();
    var OdhecatonUserModel = mongoose.model('OdhecatonUserModel', OdhecatonUserSchema);

    return api;



    function createUser(user) {
        console.log("have new user in model.server: "+user);
        var deferred = q.defer();
        console.log(user);
        OdhecatonUserModel
            .create(user, function (err, user) {
                if(err) {
                    deferred.reject(err); // reject
                } else {
                    console.log("success creating user in model.server: "+user);
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }



    function findUserByGoogleId(googleId) {
        console.log("have googleID in model: "+googleId);
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

    function findUserByUsername(username) {

        console.log('in model'+username);
        var deferred = q.defer();
        OdhecatonUserModel
            .findOne({username: username}, function (err, user) {
                if(err) {
                    deferred.reject(err); // reject
                } else {
                    console.log("in model.server"+user);
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    // updated to check that the password is correct
    function findUserByCredentials(username, password) {
        console.log("in model.server"+username);
        console.log("in model.server"+password);
        var deferred = q.defer();
        OdhecatonUserModel
            .findOne({username: username}, function (err, user) {
            console.log("err: "+err);
            console.log("user: "+user);

            if (user && (user != null)) {
                if(user && bcrypt.compareSync(password, user.password)) {  //&& bcrypt.compareSync(password, user.password
                    console.log("in model.server findUserByCredentials: "+ user);
                    deferred.resolve(user);
                } else {
                    console.log("error1 in model.server findUserByCredentials: "+ user);
                    deferred.reject(err);
                }
            } else if(err) {
                console.log("error2 in model.server findUserByCredentials: "+ user);
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
        OdhecatonUserModel
            .update({_id : userId},
                {firstName : user.firstName,
                    lastName : user.lastName,
                    //password : bcrypt.hashSync(user.password),
                    aboutMe: user.aboutMe,
                    email : user.email},
                function (err, response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    }
};