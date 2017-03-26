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
        // var newWebsite = req.body;
        // newWebsite.developerId = req.params.userId;
        // newWebsite._id = (new Date()).getTime()+"";
        // newWebsite.created = (new Date());
        // websites.push(newWebsite);
        // res.send(newWebsite);
    }

    // function someServersideFunction() {
    //     return makedbcall()
    //             .then((s1) => {
    //             return makeanotherdbcall(s1);
    // })
    // .then((s2) => {
    //         return s2; // i want this to be the return of someServersideFunction and i need it to wait for s2 before returning.
    // })
    // }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        console.log("In service.server with userId: " + userId);

        //var websiteObjects = [];

        return WebsiteModel.findAllWebsitesForUser(userId)
            .then(function (websiteIds) {
                console.log("have websiteIds in service.server: " + websiteIds);

                return WebsiteModel.findAllWebsites(websiteIds);
            })
            .then(function (websites) {
                console.log("have websiteObjects in service.server: " + websites);
                res.send(websites);
                //     // console.log("have websiteObjects in service.server: " + websites);
                //             // for(var w in websites) {
                //             //     websiteObjects.push(websites[w]);
                //             // }
                //             // console.log("pushed response into websiteObjects in service.server: " + websiteObjects);
                //             // res.sendStatus(200);
                //         }, function (error) {
                //             console.log("something went wrong in service.server");
                //             res.sendStatus(500);
                //         });
                //     console.log("pushed response into websiteObjects in service.server: " + websiteObjects);
                //     res.send(websiteObjects);
                // }, function (error) {
                //     res.sendStatus(500);
                // });
            })
    }

    // function findAllWebsitesForUser(req, res){
    //     var userId = req.params.userId;
    //     console.log("In service.server with userId: " +userId);
    //
    //     var websiteObjects = [];
    //
    //     WebsiteModel
    //         .findAllWebsitesForUser(userId) // gets array of websiteIds for userId
    //         .then(function(websiteIds) {
    //             console.log("have websiteIds in service.server: " + websiteIds);
    //
    //             WebsiteModel
    //                 .findAllWebsites(websiteIds) // gets array of websites corresponding to array of websiteIds
    //                 .then(function(websites) {
    //                     console.log("have websiteObjects in service.server: " + websites);
    //                     for(var w in websites) {
    //                         websiteObjects.push(websites[w]);
    //                     }
    //                     console.log("pushed response into websiteObjects in service.server: " + websiteObjects);
    //                     res.sendStatus(200);
    //                 }, function (error) {
    //                     console.log("something went wrong in service.server");
    //                     res.sendStatus(500);
    //                 });
    //             console.log("pushed response into websiteObjects in service.server: " + websiteObjects);
    //             res.send(websiteObjects);
    //         }, function (error) {
    //             res.sendStatus(500);
    //         });
    //
    //     // var _sites = [];
    //     // for(var w in websites) {
    //     //     if(websites[w].developerId === userId) {
    //     //         _sites.push(websites[w]);
    //     //     }
    //     // }
    //     // if (_sites) {
    //     //     res.send(_sites);
    //     //     return
    //     // } else {
    //     //     res.sendStatus(404);
    //     // }
    // }

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
        // var websiteId = req.params.websiteId;
        //
        // for(var w in websites) {
        //     var website = websites[w];
        //     if(websites[w]._id === websiteId) {
        //         res.send(website);
        //         return
        //     }
        // }
        // res.sendStatus(404);
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

        // for(var w in websites) {
        //     var website = websites[w];
        //
        //     if(website._id === websiteId ) {
        //         var newWebsite = req.body;
        //         website.name = newWebsite.name;
        //         website.description = newWebsite.description;
        //
        //         res.sendStatus(200);
        //         return
        //     }
        // }
        // res.sendStatus(404);
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
    //     var websiteId = req.params.websiteId;
    //     for (var w in websites) {
    //         if(websites[w]._id === websiteId) {
    //             websites.splice(w, 1);
    //             res.sendStatus(200);
    //             return;
    //         }
    //     }
    //     res.sendStatus(404);
};