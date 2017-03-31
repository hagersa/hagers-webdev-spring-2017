module.exports = function (app, PageModel) {
    console.log(PageModel);

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function createPage(req, res) {
            var newPage = req.body;
            var websiteId = req.params.websiteId;
            console.log(websiteId);
            console.log(newPage);

            PageModel
                .createPage(websiteId, newPage)
                .then(function(response) {
                    console.log(response);
                    res.send(response);
                }, function (error) {
                    res.sendStatus(500);
                });
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        console.log("In service.server with websiteId: " + websiteId);

        return PageModel.findAllPagesForWebsite(websiteId)
            .then(function (pageIds) {
                console.log("have pageIds in service.server: " + pageIds);

                return PageModel.findAllPages(pageIds);
            })
            .then(function (pages) {
                console.log("have websiteObjects in service.server: " + pages);
                res.send(pages);
            })
    }

    function findPageById(req, res){
        var pageId = req.params.pageId;
        console.log("have pageId in service.server: "+pageId);

        PageModel
            .findPageById(pageId)
            .then(function (page) {
                res.send(page);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params.pageId;

        console.log(pageId);

        PageModel
            .updatePage(pageId, page)
            .then(function(response) {
                res.send(response);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        console.log(pageId);

        PageModel
            .deletePage(pageId)
            .then(function () {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(500)
            });
    }
};