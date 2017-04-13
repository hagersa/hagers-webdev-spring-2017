(function(){
    angular
        .module("Odhecaton")
        .controller("YoutubeSearchController", YoutubeSearchController);

    function YoutubeSearchController($location, $routeParams, YoutubeService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        // vm.libraryId = $routeParams.wid;
        // vm.pageId = $routeParams.pid;
        // vm.widgetId = $routeParams.wgid;
        vm.searchVideo = searchVideo;
        vm.favoriteVideo = favoriteVideo;

        function init() {
        }
        init();

        function searchVideo(searchText) {
            YoutubeService
                .searchVideo(searchText)
                .then(function(response) {
                    vm.videoSearchResults = response.data;
                });
            return;
        }

        function favoriteVideo(video) {
        }
    }
})();