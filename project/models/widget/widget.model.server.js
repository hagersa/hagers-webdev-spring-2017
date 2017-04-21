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

        widget._library = libraryId;

        WidgetModel
            .create(widget, function (err, response) {

                if(err) {
                    deferred.reject(err); // reject
                } else {
                    libraryModel
                        .findLibraryById(libraryId)
                        .then(function (library) {

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

        var deferred = q.defer();

        WidgetModel
            .find({'_id': { $in: widgetIds}}, function(err, widgetObjects) {

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
                var widgetIds = library.widgets;

                deferred.resolve(widgetIds);
            });
        return deferred.promise;
    }

    function updateWidget(widgetId, widget) {
        var deferred = q.defer();

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

        WidgetModel
            .findById(widgetId, function (err, widget) {
                if(err) {
                    deferred.reject(err); // reject
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

    function getOwnerLibrary(widget) {
        var deferred = q.defer();
        var libraryId = widget._library;

        libraryModel
            .findLibraryById(libraryId)
            .then(function (library) {
                deferred.resolve(library);
            });
        return deferred.promise;
    }
};