module.exports = function (app, LibraryModel) {

    //console.log(LibraryModel);

    app.post("/api/user/:userId/library", createLibrary);
    app.get("/api/user/:userId/dirLibrary", findAllDirLibrariesForUser);
    app.get("/api/user/:userId/memLibrary", findAllMemLibrariesForUser);
    app.get("/api/library/:libraryId", findLibraryById);
    app.put("/api/library/:libraryId", updateLibrary);
    app.delete("/api/library/:libraryId", deleteLibrary);
    //app.put("/api/library/share/:libraryId", updateLibraryMembers);

    function createLibrary(req, res) {
        var newLibrary = req.body;
        var userId = req.params.userId;
        // console.log(userId);
        // console.log(newLibrary);

        LibraryModel
            .createLibraryForUser(userId, newLibrary)
            .then(function(response) {
                // console.log(response);
                res.send(response);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findAllDirLibrariesForUser(req, res) {
        var userId = req.params.userId;
        // console.log("In service.server with userId: " + userId);

        return LibraryModel.findAllDirLibrariesForUser(userId)
            .then(function (libraryIds) {
                // console.log("have libraryIds in service.server: " + libraryIds);

                return LibraryModel.findAllLibraries(libraryIds);
            })
            .then(function (libraries) {
                // console.log("have libraryObjects in service.server: " + libraries);
                res.send(libraries);
            })
    }

    function findAllMemLibrariesForUser(req, res) {
        var userId = req.params.userId;

        return LibraryModel.findAllMemLibrariesForUser(userId)
            .then(function (libraries) {
                console.log("have libraryObjects in service.server: " + libraries);
                res.send(libraries);
            }, function (error) {
                console.log("error in finding libraries back in service.server");
                res.sendStatus(500)
            });
    }

    function findLibraryById(req, res){
            var libraryId = req.params.libraryId;
            // console.log("have libraryID in service.server: "+libraryId);

            LibraryModel
                .findLibraryById(libraryId)
                .then(function (library) {
                    res.send(library);
                }, function (error) {
                    res.sendStatus(500)
                });
    }

    function updateLibrary(req, res) {
        var library = req.body;
        var libraryId = req.params.libraryId;

        console.log("in library.service.server");
        console.log("library: "+library);
        console.log("libraryId: "+libraryId);
        // console.log(libraryId);

        LibraryModel
            .updateLibrary(libraryId, library)
            .then(function(response) {
                console.log("success in library.service.server");
                res.send(response);
            }, function (error) {
                console.log("error in library.service.server");
                res.sendStatus(500);
            });
    }

    // function updateLibraryMembers(req, res) {
    //     var email = req.body;
    //     var libraryId = req.params.libraryId;
    //
    //     // console.log("email and libraryId: "+email+" "+libraryId);
    //
    //     LibraryModel
    //         .updateLibraryMembers(libraryId, email)
    //         .then(function(response) {
    //             res.send(response);
    //         }, function (error) {
    //             res.sendStatus(500);
    //         });
    // }


    function deleteLibrary(req, res) {
        var libraryId = req.params.libraryId;
        // console.log(libraryId);

        LibraryModel
            .deleteLibrary(libraryId)
            .then(function () {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(500)
            });
    }
};