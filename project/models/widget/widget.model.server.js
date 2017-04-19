module.exports = function (libraryModel) {

    var api = {
        createWidget: createWidget,
        findAllWidgets: findAllWidgets,
        findAllWidgetsForLibrary: findAllWidgetsForLibrary,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        getOwnerLibrary: getOwnerLibrary
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var WidgetSchema = require('./widget.schema.server.js')();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

    return api;

    function reorderWidget(libraryId, start, end) {
        var deferred = q.defer();

        libraryModel
            .findLibraryById(libraryId)
            .then(function (library) {
                console.log("widgets before reorder in reorderWidgets in model.server: "+library.widgets);
                console.log("start and end: "+start+" "+end);

                library.widgets.splice(end, 0, library.widgets.splice(start, 1)[0]);
                library.markModified('widgets');
                library.save(function (err, respnse) {
                    console.log(library);
                    console.log("widgets after reorder in reorderWidgets in model.server: "+library.widgets);
                    deferred.resolve(library);
                });
            });
        return deferred.promise;
    }

    function createWidget(libraryId, widget) {
        var deferred = q.defer();
        // console.log(libraryId);
        // console.log(widget);
        widget._library = libraryId;

        WidgetModel
            .create(widget, function (err, response) {
                // console.log(response);
                if(err) {
                    deferred.reject(err); // reject
                } else {
                    libraryModel
                        .findLibraryById(libraryId)
                        .then(function (library) {
                            // console.log(library);
                            library.widgets.push(response._id);
                            library.save();
                            deferred.resolve(response);
                        });
                }
            });
        return deferred.promise;
    }

    // returns widget objects corresponding to an array of widgetIds
    function findAllWidgets(widgetIds) {
        // console.log("Have widgetIds in findAllWidgets in model.server: "+widgetIds);

        var deferred = q.defer();

        WidgetModel
            .find({'_id': { $in: widgetIds}}, function(err, widgetObjects) {
                // console.log("Found widget objects in model.server: "+widgetObjects);

                if(err) {
                    deferred.reject(err); // reject
                } else {
                    deferred.resolve(widgetObjects);
                }
            });
        return deferred.promise;
    }

    // finds an array of widgetIds for a user matching a particular pageId
    function findAllWidgetsForLibrary(libraryId) {
        var deferred = q.defer();

        libraryModel
            .findLibraryById(libraryId)
            .then(function (library) {
                // console.log("found page in findAllWidgetsForLibrary in model.server"+library);
                var widgetIds = library.widgets;
                // console.log("found widgetIds in findAllWidgetsForLibrary in model.server"+widgetIds);
                deferred.resolve(widgetIds);
            });
        return deferred.promise;
    }

    function updateWidget(widgetId, widget) {
        var deferred = q.defer();
        // console.log("Have the widget in updateWidget in model.server: "+widget);
        // console.log("Have widgetType in model.server: "+widget.widgetType);

        if(widget.widgetType === "PDF") {
            WidgetModel
                .update({_id : widgetId}, {url: widget.url, info: widget.info, recording: widget.recording},
                    function (err, response) {
                        deferred.resolve(response);
                    });
        }
        else if(widget.widgetType === "YOUTUBE") {
            WidgetModel
                .update({_id : widgetId}, {width: widget.width, url: widget.url},
                    function (err, response) {
                        deferred.resolve(response);
                    });
        }
        else if(widget.widgetType === "HTML") {
            WidgetModel
                .update({_id : widgetId}, {text: widget.text},
                    function (err, response) {
                        deferred.resolve(response);
                    });
        }
        return deferred.promise;
    }

    function findWidgetById(widgetId) {
        var deferred = q.defer();
        // console.log("widgetId in model: "+widgetId);
        WidgetModel
            .findById(widgetId, function (err, widget) {
                if(err) {
                    console.log("error in model");
                    deferred.reject(err); // reject
                } else {
                    console.log("success in model");
                    console.log(widget);
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }


    function deleteWidget(widgetId) {
        var deferred = q.defer();

        WidgetModel
            .remove({_id: widgetId}, function (err, widget) {
            // console.log("widget to be deleted: "+widget);
                deferred.resolve(widget);
            });
        return deferred.promise;
    }

    function getOwnerLibrary(widget) {
        var deferred = q.defer();
        var libraryId = widget._library;

        // console.log("widget getOwnerPage: "+widget);
        // console.log("libraryId in getOwnerLibrary: "+libraryId);

        libraryModel
            .findLibraryById(libraryId)
            .then(function (library) {
                deferred.resolve(library);
            });
        return deferred.promise;
    }

};