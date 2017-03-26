module.exports = function (pageModel) {

    var api = {
        createWidget: createWidget,
        findAllWidgets: findAllWidgets,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        getOwnerPage: getOwnerPage
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
        widget._page = pageId;

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

    // returns widget objects corresponding to an array of widgetIds
    function findAllWidgets(widgetIds) {
        console.log("Have widgetIds in findAllPages in model.server: "+widgetIds);

        var deferred = q.defer();

        WidgetModel
            .find({'_id': { $in: widgetIds}}, function(err, widgetObjects) {
                console.log("Found widget objects in model.server: "+widgetObjects);

                if(err) {
                    deferred.abort(err); // reject
                } else {
                    deferred.resolve(widgetObjects);
                }
            });
        return deferred.promise;
    }

    // finds an array of widgetIds for a user matching a particular pageId
    function findAllWidgetsForPage(pageId) {
        var deferred = q.defer();

        pageModel
            .findPageById(pageId)
            .then(function (page) {
                console.log("found page in findAllWidgetsForPage in model.server"+page);
                var widgetIds = page.widgets;
                console.log("found widgetIds in findAllWidgetsForPage in model.server"+widgetIds);
                deferred.resolve(widgetIds);
            });
        return deferred.promise;
    }

    function updateWidget(widgetId, widget) {
        var deferred = q.defer();
        console.log("Have the widget in updateWidget in model.server: "+widget);
        console.log("Have widgetType in model.server: "+widget.widgetType);

        if(widget.widgetType === "HEADER") {
            WidgetModel
                .update({_id : widgetId}, {text: widget.text, size: widget.size},
                    function (err, response) {
                        deferred.resolve(response);
                    });
        }
        else if(widget.widgetType === "IMAGE") {
            WidgetModel
                .update({_id : widgetId}, {width: widget.width, url: widget.url},
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
        else if(widget.widgetType === "TEXT") {
            WidgetModel
                .update({_id : widgetId}, {text: widget.text, rows: widget.rows, placeholder: widget.placeholder, formatted: widget.formatted},
                    function (err, response) {
                        deferred.resolve(response);
                    });
        }
        return deferred.promise;
    }


    function reorderWidget(pageId, start, end) {
        var deferred = q.defer();

        pageModel
            .findPageById(pageId)
            .then(function (page) {
                console.log("found page in reorderWidgets in model.server: "+page);
                console.log("widgets before reorder in reorderWidgets in model.server: "+page.widgets);
                console.log("start and end: "+start+" "+end);

                page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);

                console.log("widgets after reorder in reorderWidgets in model.server: "+page.widgets);
                console.log("whole page after reorder in reorderWidgets in model.server: "+page);
                page.save();
                deferred.resolve(page);
            });
        return deferred.promise;
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
            console.log("widget to be deleted: "+widget);
                deferred.resolve(widget);
            });
        return deferred.promise;
    }

    function getOwnerPage(widget) {
        var deferred = q.defer();
        var pageId = widget._page;

        console.log("widget getOwnerPage: "+widget);
        console.log("pageId in getOwnerPage: "+pageId);

        pageModel
            .findPageById(pageId)
            .then(function (page) {
                deferred.resolve(page);
            });
        return deferred.promise;
    }

};