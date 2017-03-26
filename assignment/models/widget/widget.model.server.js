module.exports = function (pageModel) {

    var api = {
        createWidget: createWidget,
        findAllWidgets: findAllWidgets,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var WidgetSchema = require('./widget.schema.server.js')();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

    return api;

    function createWidget(pageId, widget) {
        var deferred = q.defer();
        console.log(pageId);
        console.log(widget);

        WidgetModel
            .create(widget, function (err, response) {
                console.log(response);
                if(err) {
                    deferred.abort(err); // reject
                } else {
                    pageModel
                        .findPageById(pageId)
                        .then(function (page) {
                            console.log(page);
                            page.widgets.push(response._id);
                            page.save();
                            deferred.resolve(response);
                        });
                }
            });
        return deferred.promise;
    }

    // returns pagee objects corresponding to an array of pageIds
    function findAllWidgets(widgetIds) {
        console.log("Have pageIds in findAllPages in model.server: "+pageIds);

        var deferred = q.defer();

        PageModel
            .find({'_id': { $in: widgetIds}}, function(err, pageObjects) {
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
    function findAllWidgetsForPage(pageId) {
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

    function updateWidget(widgetId, widget) {
        var deferred = q.defer();
        WidgetModel
            .update({_id : pageId},
                {name : page.name,
                    description : page.description},
                function (err, response) {
                    deferred.resolve(response);
                });
        return deferred.promise;
    }

    function reorderWidget(pageId, start, end) {

    }

    function findWidgetById(widgetId) {
        var deferred = q.defer();
        WidgetModel
            .findById(widgetId, function (err, widget) {
                if(err) {
                    deferred.abort(err); // reject
                } else {
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }

    function deleteWidget(widgetId) {
        var deferred = q.defer();
        WidgetModel
            .remove({_id: widgetId}, function (err, widget) {
                deferred.resolve(widget);
            });
        return deferred.promise;
    }
};