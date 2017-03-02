module.exports = function (app) {

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
        newPage.websiteId = req.params.websiteId;
        newPage._id = (new Date()).getTime()+"";
        pages.push(newPage);
        res.send(newPage);
    }

    function findAllPagesForWebsite(req, res){
        var websiteId = req.params.websiteId;

        var _pages = [];

        for(var p in pages) {
            if(pages[p].websiteId === websiteId) {
                _pages.push(pages[p]);
            }
        }
        if (_pages) {
            res.send(_pages);
            return
        } else {
            res.sendStatus(404); // .send('pages not found')
        }
        return
    }

    function findPageById(req, res){
        var pageId = req.params.pageId;

        for(var p in pages) {
            var page = pages[p];
            if(pages[p]._id === pageId) {
                res.send(page);
                return
            }
        }
        res.sendStatus(404);
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        //console.log(pageId);

        for(var p in pages) {
            var page = pages[p];

            if(page._id === pageId ) {
                var newPage = req.body;
                //console.log(newPage);

                page.name = newPage.name;
                page.description = newPage.description;

                res.sendStatus(200);
                return
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for (var p in pages) {
            if(pages[p]._id === pageId) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};