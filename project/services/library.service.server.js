module.exports = function (app, WebsiteModel) {

    console.log(WebsiteModel);

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }
    ];

    function createWebsite(req, res) {
        var newWebsite = req.body;
        var userId = req.params.userId;
        console.log(userId);
        console.log(newWebsite);

        WebsiteModel
            .createWebsiteForUser(userId, newWebsite)
            .then(function(response) {
                console.log(response);
                res.send(response);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        console.log("In service.server with userId: " + userId);

        return WebsiteModel.findAllWebsitesForUser(userId)
            .then(function (websiteIds) {
                console.log("have websiteIds in service.server: " + websiteIds);

                return WebsiteModel.findAllWebsites(websiteIds);
            })
            .then(function (websites) {
                console.log("have websiteObjects in service.server: " + websites);
                res.send(websites);
            })
    }

    function findWebsiteById(req, res){
            var websiteId = req.params.websiteId;
            console.log("have websiteID in service.server: "+websiteId);

            WebsiteModel
                .findWebsiteById(websiteId)
                .then(function (website) {
                    res.send(website);
                }, function (error) {
                    res.sendStatus(500)
                });
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;

        console.log(websiteId);

        WebsiteModel
            .updateWebsite(websiteId, website)
            .then(function(response) {
                res.send(response);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        console.log(websiteId);

        WebsiteModel
            .deleteWebsite(websiteId)
            .then(function () {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(500)
            });
    }
};