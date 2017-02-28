module.exports = function (app) {
    console.log("Hello World from app.js module and page service.server");

    //app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    //app.get("/api/page/:pageId", findPageById);
    //app.put("/api/page/:pageId", updatePage);
    //app.delete("/api/page/:pageId", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

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
};