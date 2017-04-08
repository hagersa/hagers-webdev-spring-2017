module.exports = function (app, LibraryModel) {

    console.log(LibraryModel);

    //app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/library", findAllLibrariesForUser);
    //app.get("/api/website/:websiteId", findWebsiteById);
    //app.put("/api/website/:websiteId", updateWebsite);
    //app.delete("/api/website/:websiteId", deleteWebsite);

    // function createWebsite(req, res) {
    //     var newWebsite = req.body;
    //     var userId = req.params.userId;
    //     console.log(userId);
    //     console.log(newWebsite);
    //
    //     WebsiteModel
    //         .createWebsiteForUser(userId, newWebsite)
    //         .then(function(response) {
    //             console.log(response);
    //             res.send(response);
    //         }, function (error) {
    //             res.sendStatus(500);
    //         });
    // }

    function findAllLibrariesForUser(req, res) {
        var userId = req.params.userId;
        console.log("In service.server with userId: " + userId);

        return LibraryModel.findAllLibrariesForUser(userId)
            .then(function (websiteIds) {
                console.log("have websiteIds in service.server: " + websiteIds);

                return LibraryModel.findAllLibraries(libraryIds);
            })
            .then(function (libraries) {
                console.log("have websiteObjects in service.server: " + libraries);
                res.send(libraries);
            })
    }

    // function findWebsiteById(req, res){
    //         var websiteId = req.params.websiteId;
    //         console.log("have websiteID in service.server: "+websiteId);
    //
    //         WebsiteModel
    //             .findWebsiteById(websiteId)
    //             .then(function (website) {
    //                 res.send(website);
    //             }, function (error) {
    //                 res.sendStatus(500)
    //             });
    // }

    // function updateWebsite(req, res) {
    //     var website = req.body;
    //     var websiteId = req.params.websiteId;
    //
    //     console.log(websiteId);
    //
    //     WebsiteModel
    //         .updateWebsite(websiteId, website)
    //         .then(function(response) {
    //             res.send(response);
    //         }, function (error) {
    //             res.sendStatus(500);
    //         });
    // }

    // function deleteWebsite(req, res) {
    //     var websiteId = req.params.websiteId;
    //     console.log(websiteId);
    //
    //     WebsiteModel
    //         .deleteWebsite(websiteId)
    //         .then(function () {
    //             res.sendStatus(200);
    //         }, function (error) {
    //             res.sendStatus(500)
    //         });
    // }
};