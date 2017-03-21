(function(){
    angular
        .module("WebAppMaker")
        .factory('FlickrService', flickrService);

    function flickrService($http) {

        var api = {
            "searchPhotos": searchPhotos
        };
        return api;

        var key = '398879f5f06e0f1cb0c3bb5f79269657';
        var secret = '9d7a248b9ead57c3';
        //var urlBase =
        //    "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchText) {
            console.log("in searchPhotos in service.client")
            //var url = urlBase.replace("API_KEY", key).replace("TEXT", searchText);
            return $http.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=398879f5f06e0f1cb0c3bb5f79269657&text="+searchText);
        }
    }
})();
