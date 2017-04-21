module.exports = function (app, FavoriteModel) {

    app.post("/api/favorite", createFavorite);
    app.get("/api/favorite", findFavoriteByVideoId);
    app.get("/api/favorite/:favoriteId", findFavoriteById);
    app.get("/api/user/:userId/favorites/", findFavoritesForUser);
    app.get("/api/new", findNewFavorites);
    app.put("/api/favorite", updateFavorite);

    function createFavorite(req, res) {
            var newFavorite = req.body;


            FavoriteModel
                .createFavorite(newFavorite)
                .then(function(response) {
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
        var userId = req.params.userId;

        return FavoriteModel.findFavoritesForUser(userId)
            .then(function (favoriteIds) {
                console.log("have favoroteIds in service.server: " + favoriteIds);

                return FavoriteModel.findAllFavorites(favoriteIds);
            })
            .then(function (favorites) {
                console.log("have libraryObjects in service.server: " + favorites);
                res.send(favorites);
            });
    }

    function findFavoriteByVideoId (req, res) {
        var videoId = req.query['videoId'];

        FavoriteModel
            .findFavoriteByVideoId(videoId)
            .then(function (favorite) {
                res.json(favorite);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    function findFavoriteById(req, res) {
        var favoriteId = req.body;

        FavoriteModel
            .findFavoriteById(favoriteId)
            .then(function (favorite) {
                res.json(favorite);
            }, function (error) {
                res.sendStatus(500)
            });
    }

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
};