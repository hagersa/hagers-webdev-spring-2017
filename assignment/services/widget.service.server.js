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

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ library. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function sortWidgets(req, res) {
        var start = req.query.start;
        var end = req.query.end;
        console.log([start, end]);
        widgets.splice(end, 0, widgets.splice(start, 1)[0]);
        res.send(200);
    }

    function createWidget(req, res) {
        var newWidget = req.body;
        var pageId = req.params.pageId;
        // newWidget.pageId = req.params.pageId;
        // newWidget._id = (new Date()).getTime()+"";
        // widgets.push(newWidget);

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
                console.log("the widgetType is: "+response.widgetType)
                res.send(response);
            }, function (error) {
                res.sendStatus(500);
            });
    }

        // for(var w in widgets) {
        //     if(widgets[w]._id === newWidget._id) {
        //         if(widgets[w].widgetType === "HEADER") {
        //             widgets[w].size = 1;
        //             widgets[w].text = "Edit new header text...";
        //         }
        //         else if(widgets[w].widgetType === "IMAGE") {
        //             widgets[w].width = '100%';
        //             widgets[w].url = "";
        //         }
        //         else if(widgets[w].widgetType === "YOUTUBE") {
        //             widgets[w].width = "100%";
        //             widgets[w].url = "";
        //         }
        //         else if(widgets[w].widgetType === "HTML") {
        //             widgets[w].text = "Edit new html text...";
        //         }
        //         else if(widgets[w].widgetType === "TEXT") {
        //             widgets[w].text = "Edit new text...";
        //             widgets[w].rows = 2;
        //             widgets[w].placeholder = "New text here...";
        //             widgets[w].formatted = true;
        //         }
        //     }
        // }

    //     res.send(newWidget);
    // }

    function findAllWidgetsForPage(req, res){
        var pageId = req.params.pageId;

        var _widgets = [];

        for(var w in widgets) {
            if(widgets[w].pageId === pageId) {
                _widgets.push(widgets[w]);
            }
        }
        if (_widgets) {
            res.send(_widgets);
            return
        } else {
            res.sendStatus(404);
        }
        return
    }

    function findWidgetById(req, res){
        var widgetId = req.params.widgetId;

        for(var w in widgets) {
            var widget = widgets[w];
            if(widgets[w]._id === widgetId) {
                res.send(widget);
                return
            }
        }
        res.sendStatus(404);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;

        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                var newWidget = req.body;
                if(widgets[w].widgetType === "HEADER") {
                    widgets[w].size = newWidget.size;
                    widgets[w].text = newWidget.text;
                    res.sendStatus(200);
                    return;
                }
                else if(widgets[w].widgetType === "IMAGE") {
                    widgets[w].width = newWidget.width;
                    widgets[w].url = newWidget.url;
                    res.sendStatus(200);
                    return;
                }
                else if(widgets[w].widgetType === "YOUTUBE") {
                    widgets[w].width = newWidget.width;
                    widgets[w].url = newWidget.url;
                    res.sendStatus(200);
                    return;
                }
                else if(widgets[w].widgetType === "HTML") {
                    widgets[w].text = newWidget.text;
                    res.sendStatus(200);
                    return;
                }
                else if(widgets[w].widgetType === "TEXT") {
                    widgets[w].text = newWidget.text;
                    widgets[w].rows = newWidget.rows;
                    widgets[w].placeholder = newWidget.placeholder;
                    widgets[w].formatted = newWidget.formatted;
                    res.sendStatus(200);
                    return;
                }
            }
        }
        res.sendStatus(404);
    }

    function uploadImage(req, res) {
        var widget        = req.body;
        var widgetType    = req.body.widgetType;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var userId        = req.body.userId;
        var pageId        = req.body.pageId;
        var websiteId     = req.body.websiteId;
        var myFile        = req.file;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for(var w in widgets) {
            var widget = widgets[w];
            if(widgets[w]._id === widgetId) {
                widget.url = '/uploads/'+filename;
                break;
            }
        }

        res.redirect('/assignment/#/user/'+userId+'/website/'+websiteId+'/page/'+pageId+'/widget/'+widgetId);
    }
};