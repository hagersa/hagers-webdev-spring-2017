module.exports = function (app, FavoriteModel) {

    app.post("/api/favorite", createFavorite);
    app.get("/api/favorite", findFavoriteByVideoId);
    app.get("/api/favorite/:favoriteId", findFavoriteById);
    app.get("/api/favorite/:userId", findFavoritesForUser);
    app.get("/api/new", findNewFavorites);
    // app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    // app.get("/api/favorite/:videoId", findFavoriteByVideoId);
    app.put("/api/favorite", updateFavorite);
    // app.delete("/api/page/:pageId", deletePage);

    function createFavorite(req, res) {
            var newFavorite = req.body;
            //var userId = req.params.userId;
            // console.log(websiteId);
            // console.log(newPage);

            FavoriteModel
                .createFavorite(newFavorite)
                .then(function(response) {
                    // console.log(response);
                    res.send(response);
                }, function (error) {
                    res.sendStatus(500);
                });
    }

    function findNewFavorites(req, res) {
        console.log("in server");
        FavoriteModel
            .findNewFavorites()
            .then(function (favorites) {
                console.log("have favorites: "+favorites);
                res.json(favorites);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function  findFavoritesForUser(req, res) {

    }

    function findFavoriteByVideoId (req, res) {
        var videoId = req.query['videoId'];
        // console.log(username);

        FavoriteModel
            .findFavoriteByVideoId(videoId)
            .then(function (favorite) {
                // console.log("in user server findUserByUsername " +user);
                res.json(favorite);
            }, function (error) {
                // console.log("server findUserByUsername caused a problem"+error);
                res.sendStatus(500)
            });
    }

    function findFavoriteById(req, res) {
        var favoriteId = req.body;
        // console.log(userId);

        FavoriteModel
            .findFavoriteById(favoriteId)
            .then(function (favorite) {
                res.json(favorite);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    //
    function updateFavorite(req, res) {
        var favorite = req.body;
        var favoriteId = favorite._id;
        //var favoriteId = req.params.favoriteId;

        console.log(favoriteId);

        FavoriteModel
            .updateFavorite(favoriteId, favorite)
            .then(function(response) {
                res.send(response);
            }, function (error) {
                res.sendStatus(500);
            });
    }
    //
    // function deletePage(req, res) {
    //     var pageId = req.params.pageId;
    //     console.log(pageId);
    //
    //     PageModel
    //         .deletePage(pageId)
    //         .then(function () {
    //             res.sendStatus(200);
    //         }, function (error) {
    //             res.sendStatus(500)
    //         });
    // }
};