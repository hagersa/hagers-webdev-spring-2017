module.exports = function (websiteModel) {

    var api = {
        createPage: createPage,
        findAllPages: findAllPages,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        //findAllWidgetsForPage: findAllWidgetsForPage
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var PageSchema = require('./page.schema.server.js')();
    var PageModel = mongoose.model('PageModel', PageSchema);

    return api;

    // did not work to return all widgets
    // function findAllWidgetsForPage(pageId) {
    //     var deferred = q.defer();
    //
    //     //update to get widgets in correct order, need to find them from the page widget ids
    //     PageModel
    //         .findById(pageId)
    //         .populate('widgets')
    //         .exec(function (page) {
    //             deferred.resolve(page.widgets);
    //         });
    // }

    function createPage(websiteId, page) {
        var deferred = q.defer();
        console.log(websiteId);
        console.log(page);

        PageModel
            .create(page, function (err, response) {
                console.log(response);
                if(err) {
                    deferred.abort(err); // reject
                } else {
                    websiteModel
                        .findWebsiteById(websiteId)
                        .then(function (website) {
                            console.log(website);
                            website.pages.push(response._id);
                            website.save();
                            deferred.resolve(response); // user.websites
                        });
                }
            });
        return deferred.promise;
    }

    // returns pagee objects corresponding to an array of pageIds
    function findAllPages(pageIds) {
        console.log("Have pageIds in findAllPages in model.server: "+pageIds);

        var deferred = q.defer();

        PageModel
            .find({'_id': { $in: pageIds}}, function(err, pageObjects) {
                console.log("Found page objects in model.server: "+pageObjects);

                if(err) {
                    deferred.abort(err); // reject
                } else {
                    deferred.resolve(pageObjects);
                }
            });
        return deferred.promise;
    }

    // finds an array of pageIds for a user matching a particular websiteId
    function findAllPagesForWebsite(websiteId) {
        var deferred = q.defer();

        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                console.log("found website in findAllPagesForWebsite in model.server"+website);
                var pageIds = website.pages;
                console.log("found pageIds in findAllPagesForWebsite in model.server"+pageIds);
                deferred.resolve(pageIds);
            });
        return deferred.promise;
    }

    function findPageById(pageId) {
        var deferred = q.defer();
        PageModel
            .findById(pageId, function (err, page) {
                if(err) {
                    deferred.abort(err); // reject
                } else {
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }

    function deletePage(pageId) {
        var deferred = q.defer();
        PageModel
            .remove({_id: pageId}, function (err, page) {
                deferred.resolve(page);
            });
        return deferred.promise;
    }

    function updatePage(pageId, page) {
        var deferred = q.defer();
        PageModel
            .update({_id : pageId},
                {name : page.name,
                    description : page.description},
                function (err, response) {
                    deferred.resolve(response);
                });
        return deferred.promise;
    }
};