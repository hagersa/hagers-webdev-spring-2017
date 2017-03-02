module.exports = function (app) {

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
        newWebsite.developerId = req.params.userId;
        newWebsite._id = (new Date()).getTime()+"";
        newWebsite.created = (new Date());
        websites.push(newWebsite);
        res.send(newWebsite);
    }

    function findAllWebsitesForUser(req, res){
        var userId = req.params.userId;
        var _sites = [];

        for(var w in websites) {
            if(websites[w].developerId === userId) {
                _sites.push(websites[w]);
            }
        }
        if (_sites) {
            res.send(_sites);
            return
        } else {
            res.sendStatus(404);
        }
    }

    function findWebsiteById(req, res){
        var websiteId = req.params.websiteId;

        for(var w in websites) {
            var website = websites[w];
            if(websites[w]._id === websiteId) {
                res.send(website);
                return
            }
        }
        res.sendStatus(404);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;

        for(var w in websites) {
            var website = websites[w];

            if(website._id === websiteId ) {
                var newWebsite = req.body;
                website.name = newWebsite.name;
                website.description = newWebsite.description;

                res.sendStatus(200);
                return
            }
        }
        res.sendStatus(404);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for (var w in websites) {
            if(websites[w]._id === websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};