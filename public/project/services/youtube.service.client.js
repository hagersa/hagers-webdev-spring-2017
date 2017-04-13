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
        //var secret = '';

        function searchVideo(searchText) {
            //'https://www.googleapis.com/youtube/v3/search?q='+searchText+'&part=snippet&key=AIzaSyAxfV6VbrAN-flzPxfvTqZHKUWpwT3odmo'
            // https://content.googleapis.com/youtube/v3/search?part=snippet&q=music&key=AIzaSyD-a9IF8KKYgoC3cpgS-Al7hLQDbugrDcw
            var url='https://www.googleapis.com/youtube/v3/search?q='+searchText+'&part=snippet&key=AIzaSyAxfV6VbrAN-flzPxfvTqZHKUWpwT3odmo';
            return $http.get(url);
        }

        function favoriteVideo() {

        }
    }
})();
