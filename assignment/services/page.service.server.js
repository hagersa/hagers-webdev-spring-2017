module.exports = function (app) { // add PageModel

    //console.log(PageModel);

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
            // var newPage = req.body;
            // var websiteId = req.params.websiteId;
            // console.log(websiteId);
            // console.log(newPage);
            //
            // PageModel
            //     .createPage(websiteId, newPage)
            //     .then(function(response) {
            //         console.log(response);
            //         res.send(response);
            //     }, function (error) {
            //         res.sendStatus(500);
            //     });

        var newPage = req.body;
        newPage.websiteId = req.params.websiteId;
        newPage._id = (new Date()).getTime()+"";
        pages.push(newPage);
        res.send(newPage);
    }

    function findAllPagesForWebsite(req, res){
        // var websiteId = req.params.websiteId;
        // console.log("In service.server with websiteId: " +websiteId);
        //
        // //var pageObjects = ["a","b","c"];
        //
        // PageModel
        //     .findAllPagesForUser(websiteId) // gets array of websiteIds for userId
        //     .then(function(pageIds) {
        //         console.log("have pageIds in service.server: " + pageIds);
        //
        //         PageModel
        //             .findAllPages(pageIds) // gets array of websites corresponding to array of websiteIds
        //             .then(function(pages) {
        //                 console.log("have pageObjects in service.server: " + pages);
        //                 // for(var r in response) {
        //                 //     pageObjects.push(response[r]);
        //                 // }
        //                 // console.log("pushed response into pageObjects in service.server: " + pageObjects);
        //                 res.send(pages);
        //             }, function (error) {
        //                 res.sendStatus(500);
        //             });
        //         res.sendStatus(200);
        //     }, function (error) {
        //         res.sendStatus(500);
        //     });
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