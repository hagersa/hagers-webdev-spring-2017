module.exports = function (userModel) {

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsites: findAllWebsites,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };


    var mongoose = require('mongoose');
    var q = require('q');

    var WebsiteSchema = require('./website.schema.server.js')();
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

    return api;

    function createWebsiteForUser(userId, website) {
        var deferred = q.defer();
        console.log(userId);
        console.log(website);

        WebsiteModel
            .create(website, function (err, response) {
                console.log(response);
                if(err) {
                    deferred.abort(err); // reject
                } else {
                    userModel
                        .findUserById(userId)
                        .then(function (user) {
                            console.log(user);
                            user.websites.push(response._id);
                            user.save();
                            deferred.resolve(response); // user.websites
                    });
                }
            });
        return deferred.promise;
    }

    // returns website objects corresponding to an array of websiteIds
    function findAllWebsites(websiteIds) {
        console.log("Have websiteIds in findAllWebsites in model.server: "+websiteIds);

        var deferred = q.defer();

        WebsiteModel
            .find({'_id': { $in: websiteIds}}, function(err, websiteObjects) {
                console.log("Found website objects in model.server: "+websiteObjects);

                if(err) {
                    deferred.abort(err); // reject
                } else {
                    deferred.resolve(websiteObjects);
                }
            });
        return deferred.promise;
    }

    // finds an array of websiteIds for a user matching a particular userId
    function findAllWebsitesForUser(userId) {
       var deferred = q.defer();

       userModel
           .findUserById(userId)
           .then(function (user) {
               console.log("found user in findAllWebsitesForUser in model.server"+user);
               var websiteIds = user.websites;
               console.log("found websiteIds in findAllWebsitesForUser in model.server"+websiteIds);
               deferred.resolve(websiteIds);
           });
       return deferred.promise;
    }



    function findWebsiteById(websiteId) {
        var deferred = q.defer();
        WebsiteModel
            .findById(websiteId, function (err, website) {
                if(err) {
                    deferred.abort(err); // reject
                } else {
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }

    function deleteWebsite(websiteId) {
        var deferred = q.defer();
        WebsiteModel
            .remove({_id: websiteId}, function (err, website) {
                deferred.resolve(website);
            });
        return deferred.promise;
    }

    function updateWebsite(websiteId, website) {
        var deferred = q.defer();
        WebsiteModel
            .update({_id : websiteId},
                {name : website.name,
                 description : website.description},
                function (err, response) {
                    deferred.resolve(response);
                });
        return deferred.promise;
    }
};

//update, findById