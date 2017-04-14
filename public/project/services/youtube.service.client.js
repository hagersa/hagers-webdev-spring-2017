(function(){
    angular
        .module("Odhecaton")
        .factory('YoutubeService', YoutubeService);

    function YoutubeService($http) {

        var api = {
            "searchVideo": searchVideo,
            "favoriteVideo": favoriteVideo


        };
        return api;

        // Google API Key
        var key = 'AIzaSyAxfV6VbrAN-flzPxfvTqZHKUWpwT3odmo';

        function searchVideo(searchText) {
            var url='https://www.googleapis.com/youtube/v3/search?q='+searchText+'&part=snippet&maxResults=20&key=AIzaSyAxfV6VbrAN-flzPxfvTqZHKUWpwT3odmo';
            return $http.get(url);
        }

        function favoriteVideo() {

        }
    }
})();
