// need to check git code

(function () {
    angular
        .module("MovieApp", [])
        .controller("MovieController", MovieController);

    function MovieCOntroller($http) {
        var vm = this;
        vm.createMovie = createMovie;
        vm.deleteMovie = deleteMovie;
        vm.updateMovie = updateMovie;

        function init() {
            $http
                .get('/api/lectures/movie')
                .success(renderMovies);
        } init()

        function renderMovies() {

        }

        function findAllMovies(req, res) {

        }

        function updateMovie() {

        }

        function renderMovie() {

        }

        function deleteMovies() {
            $http
                .delete('/api/lectures/movie', movie)
                .success(findAllMovies());
        }

        function createMovie() {
            $http
             .post('/api/lectures/movie', movie)
        }


    }
})