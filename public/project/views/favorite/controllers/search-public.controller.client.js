(function(){
    angular
        .module("Odhecaton")
        .controller("YoutubePublicSearchController", YoutubePublicSearchController);

    function YoutubePublicSearchController($sce, $location, $routeParams, YoutubeService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.searchText = $routeParams.searchText;
        vm.searchVideo = searchVideo;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.favoriteVideo = favoriteVideo;
        vm.moreInfo = moreInfo;

        function init() {
                vm.searchTitle = vm.searchText;
                searchVideo(vm.searchText);
        } init();


        function searchVideo(searchText) {
            YoutubeService
                .searchVideo(searchText)
                .then(function(response) {
                    vm.videoSearchResults = response.data;
                });
            return;
        }

        function getYouTubeEmbedUrl(videoId) {
            var url = "https://www.youtube.com/embed/"+videoId;
            return $sce.trustAsResourceUrl(url);
        }

        function favoriteVideo(video) {
            var answer = confirm("Please login to create favorites.");
            if(answer) {
                $location.url('/');
            }
        }

        function moreInfo() {
            var answer = confirm("Please login to view more info.");
            if(answer) {
                $location.url('/');
            }
        }
    }
})();