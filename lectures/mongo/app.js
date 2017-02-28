// check git code (lectures/mongo)

module.exports = function (app) {
    app.post('api/lectures/movie', createMovie);
    app.get('/api/lectures/movie', findAllMovies);
    app.delete('/api/lectures/movie', deleteMovie);
    app.get('/api/lectures/movie/:movieId', findMovieById)
    app.put('/api/lectures/movie/:movieId', updateMovie)

    var mongoose = require('mongoose');

    var MovieSchema = mongoose.Schema({
        title: String,
        director: String,
        rating: String,
        created: Date
    }, {collection: 'movie'});

    var MovieModel = mongoose.model('MovieModel', MovieSchema); // provides CRUD operations

    function findAllMovies(req, res) {

    }

    function findMovieById(req, res) {
        var movieId = req.params.movieId;
        MovieModel
            .findById(movieId)
            .then(
                function (movie) {
                    res.json(movie);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateMovie(req, res) {
        var movieId = req.params.movieId;

    }

    function deleteMovie(req, res) {
        // must use remove, not delete this time
        // missing some code
        MovieModel // returns promise
            .remove(movie)
            .then(findAllMovies());
    }

    function createMovie(req, res) {
        var movie = req.body;
        MovieModel // returns promise
            .create(movie)
            .then(
                function (movie) {
                    res.json(movie);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    // use test (database name)
    // show collections
    // in mongo: db.moviemodels.find()

}