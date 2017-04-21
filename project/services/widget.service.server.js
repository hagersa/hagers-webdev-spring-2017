module.exports = function (app, WidgetModel) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads'});

    app.post("/api/library/:libraryId/widget", createWidget);
    app.get("/api/library/:libraryId/widget", findAllWidgetsForLibrary);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    // app.post ("/api/upload", upload.single('myFile'), uploadPdf);
    app.put("/api/library/:libraryId/widget", sortWidgets);

    function sortWidgets(req, res) {
        var libraryId = req.params.libraryId;
        var start = req.query.start;
        var end = req.query.end;
        console.log([start, end]);

        WidgetModel
            .reorderWidget(libraryId, start, end)
            .then(function(response) {
                res.send(response);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function createWidget(req, res) {
        var newWidget = req.body;
        var libraryId = req.params.libraryId;

        if(newWidget.widgetType === 'PDF') {
            newWidget.width = '100%';
            newWidget.url = "";
        }
        else if(newWidget.widgetType === 'YOUTUBE') {
            newWidget.width = "100%";
            newWidget.url = "";
        }
        else if(newWidget.widgetType === 'HTML') {
            newWidget.text = "Edit new html text...";
        }

        WidgetModel
            .createWidget(libraryId, newWidget)
            .then(function (response) {
                res.send(response);
            }, function (error) {
                res.sendStatus(500);
            });
    }


    function findAllWidgetsForLibrary(req, res) {
        var libraryId = req.params.libraryId;

        return WidgetModel.findAllWidgetsForLibrary(libraryId)
            .then(function (widgetIds) {
                return WidgetModel.findAllWidgets(widgetIds);
            })
            .then(function (widgets) {
                res.send(widgets);
            })
    }


    function findWidgetById(req, res){

        var widgetId = req.params.widgetId;

        WidgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.send(widget);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        WidgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {

                WidgetModel
                    .getOwnerLibrary(widget)
                    .then(function (library) {

                        var index = library.widgets.indexOf(widgetId);

                        if (index > -1) {
                            library.widgets.splice(index, 1);
                        }

                        library.save();

                        WidgetModel
                            .deleteWidget(widgetId)
                            .then(function (widget) {
                                res.sendStatus(200);
                            }, function (error) {
                                res.sendStatus(500);
                            });
                    });
            });
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;

        WidgetModel
            .updateWidget(widgetId, widget)
            .then(function(response) {
                res.send(response);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    // function uploadPdf(req, res) {
    //     var widget        = req.body;
    //     var widgetType = req.body.widgetType;
    //     var widgetId      = req.body.widgetId;
    //     var width = req.body.width;
    //     var userId = req.body.userId;
    //     var libraryId = req.body.libraryId;
    //     var myFile = req.file;
    //     var originalname = myFile.originalname; // file name on user's computer
    //     var filename = myFile.filename;     // new file name in upload folder
    //     var path = myFile.path;         // full path of uploaded file
    //     var destination = myFile.destination;  // folder where file is saved to
    //     var size = myFile.size;
    //     var mimetype = myFile.mimetype;
    //
    //     // console.log("widgetId in upload pdf: " + widgetId);
    //
    //     WidgetModel
    //         .findWidgetById(widgetId)
    //         .then(function (response) {
    //             // console.log("have widget: "+response);
    //             response.url = '/uploads/' + filename;
    //             response.width = width;
    //
    //             // console.log("here is the url: "+response.url);
    //             // console.log("here is the width: "+response.width);
    //
    //             WidgetModel
    //                 .updateWidget(widgetId, response)
    //                 .then(function (result) {
    //                     // console.log("updated widget: "+result);
    //                     res.redirect('/project/#/user/' + userId + '/library/' + libraryId + '/widget/' + widgetId);
    //                     //res.send(response);
    //                 }, function (error) {
    //                     res.sendStatus(500);
    //                 });
    //         });
    // }
};