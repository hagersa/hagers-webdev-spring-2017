module.exports = function (app) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads'});

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function createWidget(req, res) {
        var newWidget = req.body;
        newWidget.pageId = req.params.pageId;
        newWidget._id = (new Date()).getTime()+"";
        widgets.push(newWidget);

        for(var w in widgets) {
            if(widgets[w]._id === newWidget._id) {
                if(widgets[w].widgetType === "HEADER") {
                    widgets[w].size = 1;
                    widgets[w].text = "Edit new header text...";
                }
                else if(widgets[w].widgetType === "IMAGE") {
                    widgets[w].width = "100%";
                    widgets[w].url = "";
                }
                else if(widgets[w].widgetType === "YOUTUBE") {
                    widgets[w].width = "100%";
                    widgets[w].url = "";
                }
                else if(widgets[w].widgetType === "HTML") {
                    widgets[w].text = "Edit new html text...";
                }
            }
        }

        res.send(newWidget);
    }

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