module.exports = function (app, LibraryModel) {

    app.post("/api/user/:userId/library", createLibrary);
    app.get("/api/user/:userId/dirLibrary", findAllDirLibrariesForUser);
    app.get("/api/user/:userId/memLibrary", findAllMemLibrariesForUser);
    app.get("/api/library/:libraryId", findLibraryById);
    app.put("/api/library/:libraryId", updateLibrary);
    app.delete("/api/library/:libraryId", deleteLibrary);

    function createLibrary(req, res) {
        var newLibrary = req.body;
        var userId = req.params.userId;

        LibraryModel
            .createLibraryForUser(userId, newLibrary)
            .then(function(response) {
                res.send(response);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findAllDirLibrariesForUser(req, res) {
        var userId = req.params.userId;

        return LibraryModel.findAllDirLibrariesForUser(userId)
            .then(function (libraryIds) {
                return LibraryModel.findAllLibraries(libraryIds);
            })
            .then(function (libraries) {
                res.send(libraries);
            })
    }

    function findAllMemLibrariesForUser(req, res) {
        var userId = req.params.userId;

        return LibraryModel.findAllMemLibrariesForUser(userId)
            .then(function (libraries) {
                res.send(libraries);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    function findLibraryById(req, res){
            var libraryId = req.params.libraryId;

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

        LibraryModel
            .updateLibrary(libraryId, library)
            .then(function(response) {
                res.send(response);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function deleteLibrary(req, res) {
        var libraryId = req.params.libraryId;

        LibraryModel
            .deleteLibrary(libraryId)
            .then(function () {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(500)
            });
    }
};