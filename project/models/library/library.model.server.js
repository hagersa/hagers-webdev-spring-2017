module.exports = function (odhecatonUserModel) {

    var api = {
        createLibraryForUser: createLibraryForUser,
        findAllLibraries: findAllLibraries,
        findAllDirLibrariesForUser: findAllDirLibrariesForUser,
        findAllMemLibrariesForUser: findAllMemLibrariesForUser
        //findLibraryById: findLibraryById,
        //updateLibrary: updateLibrary,
        //deleteLibrary: deleteLibrary
    };


    var mongoose = require('mongoose');
    var q = require('q');

    var LibrarySchema = require('./library.schema.server.js')();
    var LibraryModel = mongoose.model('LibraryModel', LibrarySchema);

    return api;

    function createLibraryForUser(userId, library) {
        var deferred = q.defer();
        console.log(userId);
        console.log(library);

        LibraryModel
            .create(library, function (err, response) {
                console.log(response);
                if(err) {
                    deferred.reject(err); // reject
                } else {
                    odhecatonUserModel
                        .findUserById(userId)
                        .then(function (user) {
                            console.log(user);
                            user.dirLibraries.push(response._id);
                            user.save();
                            deferred.resolve(response); // user.websites
                    });
                }
            });
        return deferred.promise;
    }

    // returns library objects corresponding to an array of websiteIds
    function findAllLibraries(libraryIds) {
        console.log("Have libraryIds in findAllDirLibraries in model.server: "+libraryIds);

        var deferred = q.defer();

        LibraryModel
            .find({'_id': { $in: libraryIds}}, function(err, libraryObjects) {
                console.log("Found Library objects in model.server: "+libraryObjects);

                if(err) {
                    deferred.abort(err); // reject
                } else {
                    deferred.resolve(libraryObjects);
                }
            });
        return deferred.promise;
    }

    // finds an array of libraryIds for a user matching a particular userId
    function findAllDirLibrariesForUser(userId) {
       var deferred = q.defer();

       odhecatonUserModel
           .findUserById(userId)
           .then(function (user) {
               console.log("found user in findAllLibrariesForUser in model.server"+user);
               var libraryIds = user.dirLibraries;
               console.log("found libraryIds in findAllDirLibrariesForUser in model.server"+libraryIds);
               deferred.resolve(libraryIds);
           });
       return deferred.promise;
    }

    function findAllMemLibrariesForUser(userId) {
        var deferred = q.defer();

        odhecatonUserModel
            .findUserById(userId)
            .then(function (user) {
                console.log("found user in findAllLibrariesForUser in model.server"+user);
                var libraryIds = user.memLibraries;
                console.log("found libraryIds in findAllMemLibrariesForUser in model.server"+libraryIds);
                deferred.resolve(libraryIds);
            });
        return deferred.promise;
    }



    // function findLibraryById(libraryId) {
    //     var deferred = q.defer();
    //     LibraryModel
    //         .findById(libraryId, function (err, library) {
    //             if(err) {
    //                 deferred.abort(err); // reject
    //             } else {
    //                 deferred.resolve(library);
    //             }
    //         });
    //     return deferred.promise;
    // }

    // function deleteLibrary(libraryId) {
    //     var deferred = q.defer();
    //
    //     LibraryModel
    //         .remove({_id: libraryId}, function (err, library) {
    //
    //             deferred.resolve(library);
    //         });
    //     return deferred.promise;
    // }

    // function updateLibrary(libraryId, library) {
    //     var deferred = q.defer();
    //     LibraryModel
    //         .update({_id : libraryId},
    //             {name : library.name,
    //              description : library.description},
    //             function (err, response) {
    //                 deferred.resolve(response);
    //             });
    //     return deferred.promise;
    // }
};