(function(){
    angular
        .module("Odhecaton")
        .controller("PublicProfileController", PublicProfileController);

    function PublicProfileController($sce, $location, $routeParams, YoutubeService, OdhecatonUserService, FavoriteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.followId = $routeParams.pid;
        vm.searchVideo = searchVideo;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.favoriteVideo = favoriteVideo;
        vm.findFavoritesForUser = findFavoritesForUser;



        function init() {
            OdhecatonUserService
                .findUserById(vm.followId)
                .success(function (user) {
                    vm.user = user;
                    vm.username = user.username;
                    vm.email = user.email;
                    vm.aboutMe = user.aboutMe;
                })
                .error(function () {
                    vm.error = 'could not find user';
                });

            // return user object array
            OdhecatonUserService
                .findFollowersForUser(vm.user.followers)
                .success(function (followers) {
                    vm.followers = followers;
                })
                .error(function () {});

            // return user object array
            OdhecatonUserService
                .findFollowingForUser(vm.user.following)
                .success(function (following) {
                    vm.following = following;
                })
                .error(function () {});

            // declare in Service
            // return favorite object array
            FavoriteService
                .findFavoritesForUser(vm.followId)
                .success(renderFavorites)
                .error(function () {});


        } init();

        function renderFavorites(favorites) {
            vm.favorites = favorites;
        }


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
            var newFavorite = {
                videoId: video.id.videoId,
                title: video.snippet.title,
                description: video.snippet.description,
                channelTitle: video.snippet.channelTitle,
                publishedAt: video.snippet.publishedAt
            };

            // console.log("new favorite is: "+newFavorite);

            FavoriteService
                .findFavoriteByVideoId(newFavorite.videoId)
                .then(function (response) {

                    if (response.data != null) {
                        var myFavorite = response.data;

                        OdhecatonUserService
                            .findUserById(vm.userId)
                            .then(function (user) {
                                vm.user = user.data;
                                vm.username = user.data.username;
                                var newUser = {_id: vm.userId, username: vm.username};
                                myFavorite.users.push(newUser);
                                vm.user.favorites.push(myFavorite._id);

                                FavoriteService
                                    .updateFavorite(myFavorite)
                                    .then(function (response) {
                                        // add logic to prevent a favorite from being added twice
                                        OdhecatonUserService
                                            .updateUser(vm.userId, vm.user)
                                            .then(function (response) {
                                            });
                                    });
                            });
                    } else {
                        FavoriteService
                            .createFavorite(newFavorite)
                            .then(function (response) {
                                var myFavorite = response.data;

                                if (myFavorite == null) {
                                    console.log("no success creating favorite");
                                    vm.error = "could not create favorite";
                                } else {
                                    var favoriteId = myFavorite._id;

                                    OdhecatonUserService
                                        .findUserById(vm.userId)
                                        .then(function (user) {
                                            vm.user = user.data;
                                            console.log(user);
                                            vm.username = user.data.username;
                                            var newUser = {_id: vm.userId, username: vm.username};
                                            myFavorite.users.push(newUser);
                                            vm.user.favorites.push(myFavorite._id);

                                            FavoriteService
                                                .updateFavorite(myFavorite)
                                                .then(function (response) {

                                                    OdhecatonUserService
                                                        .updateUser(vm.userId, vm.user)
                                                        .then(function (response) {
                                                        });
                                                });
                                        });
                                }
                            });
                    }
                });
        }
    }
})();