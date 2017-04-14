(function(){
    angular
        .module("Odhecaton")
        .controller("NewsFeedController", NewsFeedController);

    function NewsFeedController($routeParams, FavoriteService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        function init() {
            // OdhecatonUserService
            //     .findUserById(vm.userId)
            //     .success(renderUser)
            //     .error(function () {});

            FavoriteService
                .findNewFavorites()
                .success(renderFavorites)
                .error(function () {});
        } init();

        function renderFavorites(favorites) {
            vm.favorites = favorites;
        }
    }
})();