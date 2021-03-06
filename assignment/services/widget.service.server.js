module.exports = function (app, WidgetModel) {

    console.log(WidgetModel);

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads'});

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/page/:pageId/widget", sortWidgets);

    function sortWidgets(req, res) {
        var pageId = req.params.pageId;
        var start = req.query.start;
        var end = req.query.end;
        console.log([start, end]);

        WidgetModel
            .reorderWidget(pageId, start, end)
            .then(function(response) {
                res.send(response);
            }, function (error) {
                res.sendStatus(500);
            });
    }



    function createWidget(req, res) {
        var newWidget = req.body;
        var pageId = req.params.pageId;

        if(newWidget.widgetType === 'HEADER') {
            newWidget.size = 1;
            newWidget.text = "Edit new header text...";
        }
        else if(newWidget.widgetType === 'IMAGE') {
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
        else if(newWidget.widgetType === 'TEXT') {
            newWidget.text = "Edit new text...";
            newWidget.rows = 2;
            newWidget.placeholder = "New text here...";
            newWidget.formatted = true;
        }

        WidgetModel
            .createWidget(pageId, newWidget)
            .then(function (response) {
                console.log(response);
                console.log("the widgetType in service.server is: "+response.widgetType);
                res.send(response);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        console.log("In service.server with pageId: " + pageId);

        return WidgetModel.findAllWidgetsForPage(pageId)
            .then(function (widgetIds) {
                console.log("have widgetIds in service.server: " + widgetIds);

                return WidgetModel.findAllWidgets(widgetIds);
            })
            .then(function (widgets) {
                console.log("have widgetObjects in service.server: " + widgets);
                res.send(widgets);
            })
    }

    function findWidgetById(req, res){
        var widgetId = req.params.widgetId;
        console.log("have widgetId in service.server: "+widgetId);

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
        console.log(widgetId);

        WidgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                console.log("widget in service.server: "+widget);
                WidgetModel
                    .getOwnerPage(widget)
                    .then(function (page) {
                        console.log("have page in service.server: "+page);
                        var index = page.widgets.indexOf(widgetId);
                        console.log("index is: "+index);
                        if (index > -1) {
                            page.widgets.splice(index, 1);
                        }
                        console.log("updated page.widgets: "+page.widgets);
                        page.save();

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

        console.log(widgetId);

        WidgetModel
            .updateWidget(widgetId, widget)
            .then(function(response) {
                res.send(response);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function uploadImage(req, res) {
        var widget        = req.body;
        var widgetType = req.body.widgetType;
        var widgetId      = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var pageId = req.body.pageId;
        var websiteId = req.body.websiteId;
        var myFile = req.file;
        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        console.log("widgetId in upload image: " + widgetId);

        WidgetModel
            .findWidgetById(widgetId)
            .then(function (response) {
                console.log("have widget: "+response);
                response.url = '/uploads/' + filename;
                response.width = width;

                console.log("here is the url: "+response.url);
                console.log("here is the width: "+response.width);

                WidgetModel
                    .updateWidget(widgetId, response)
                    .then(function (result) {
                        console.log("updated widget: "+result);
                        res.redirect('/assignment/#/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId);
                        //res.send(response);
                    }, function (error) {
                        res.sendStatus(500);
                    });
            });
    }
};