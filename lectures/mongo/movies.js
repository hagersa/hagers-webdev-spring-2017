(function () {
    angular
        .module("MovieApp", [])
        .config(configuration)
        .controller("MovieController", MovieController);

    function configuration($httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
    }

    function MovieController($http) {
        var vm = this;
        vm.createMovie = createMovie;
        vm.deleteMovie = deleteMovie;
        vm.selectMovie = selectMovie;
        vm.updateMovie = updateMovie;
        vm.searchMovie = searchMovie;
        vm.searchMovieDetails = searchMovieDeatils;
        vm.likeMovie = likeMovie;

        function init() {
            findAllMovies();
        }
        init();


        // fill this in
        function likeMovie(movie) {
            var title = movie.Title;
            var imdbId = movie.imdbId;
            var poster = movie.Poster;


            createMovie(movie);
        }

        function searchMovieDetails (imdbID) {
            var url = "http://www.omdbapi.com/?i=" + imdbID;
            $http.get(url)
                .success(renderMovieDeails);
        }

        function renderMovieDetails (result) {
            vm.movieDetails = result;
        }


        function searchMovie() {
            var url = "http://www.omdbapi.com/?s=" + movie.searchTitle;
            $http.get(url)
                .success(renderSearchResults);
            console.log(movie);
        }

        // fill in
        function renderSearchResults (results) {
            vm.movieSearchResults = results.Search;
        }

        function updateMovie(movie) {
            $http
                .put('/api/lectures/movie/' + movie._id, movie)
                .success(findAllMovies);
        }

        function selectMovie(movieId) {
            $http
                .get('/api/lectures/movie/' + movieId)
                .success(renderMovie);
        }

        function renderMovie(movie) {
            vm.movie = movie;
        }

        function deleteMovie(movieId) {
            $http
                .delete('/api/lectures/movie/' + movieId)
                .success(findAllMovies);
        }

        function findAllMovies() {
            $http
                .get('/api/lectures/movie')
                .success(renderMovies);
        }

        function createMovie(movie) {
            $http
                .post('/api/lectures/movie', movie)
                .success(findAllMovies);
        }

        function renderMovies(movies) {
            vm.movies = movies;
        }
    }
})();