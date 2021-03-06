(function(){
    angular
        .module("Odhecaton")
        .controller("NewsfeedController", NewsfeedController);

    function NewsfeedController($sce, $location, $routeParams, YoutubeService, OdhecatonUserService, FavoriteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        // vm.searchVideo = searchVideo;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.favoriteVideo = favoriteVideo;
        // vm.viewInfo = viewInfo;
        // vm.newVideos;
        // vm.showNewFavorites = showNewFavorites;
        // vm.videosForUser = videosForUser;

        function init() {
            OdhecatonUserService
                .findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                    vm.username = user.username;
                })
                .error(function () {
                    vm.error = 'could not find user';
                });

            FavoriteService
                .findNewFavorites()
                .success(renderFavorites)
                .error(function () {});
        } init();

        function renderFavorites(favorites) {
            vm.favorites = favorites;
        }

        function getYouTubeEmbedUrl(videoId) {
            var url = "https://www.youtube.com/embed/"+videoId;
            return $sce.trustAsResourceUrl(url);
        }

        function favoriteVideo(video) {
            // var x = document.getElementById('favorite');
            // var y = document.getElementById('unfavorite');
            //
            // x.style.display = 'none';
            // y.style.display = 'block';


            // var newFavorite = {
            //     videoId: video.id.videoId,
            //     title: video.snippet.title,
            //     description: video.snippet.description,
            //     channelTitle: video.snippet.channelTitle,
            //     publishedAt: video.snippet.publishedAt
            // };

            // console.log("new favorite is: "+newFavorite);

            // FavoriteService
            //     .findFavoriteByVideoId(.videoId)
            //     .then(function (response) {
            //
            //         if (response.data != null) {
            //             var myFavorite = response.data;

                        OdhecatonUserService
                            .findUserById(vm.userId)
                            .then(function (user) {
                                vm.user = user.data;
                                vm.username = user.data.username;
                                var newUser = {_id: vm.userId, username: vm.username};
                                video.users.push(newUser);
                                vm.user.favorites.push(video._id);

                                FavoriteService
                                    .updateFavorite(video)
                                    .then(function (response) {
                                        // add logic to prevent a favorite from being added twice
                                        OdhecatonUserService
                                            .updateUser(vm.userId, vm.user)
                                            .then(function (response) {
                                            });
                                    });
                            });
                    // } else {
                    //     FavoriteService
                    //         .createFavorite(newFavorite)
                    //         .then(function (response) {
                    //             var myFavorite = response.data;
                    //
                    //             if (myFavorite == null) {
                    //                 console.log("no success creating favorite");
                    //                 vm.error = "could not create favorite";
                    //             } else {
                    //                 var favoriteId = myFavorite._id;
                    //                 // var newUser = {_id: vm.userId, username: vm.username};
                    //                 //
                    //                 // vm.user.favorites.push(favoriteId);
                    //                 // myFavorite.users.push(newUser);
                    //
                    //                 OdhecatonUserService
                    //                     .findUserById(vm.userId)
                    //                     .then(function (user) {
                    //                         vm.user = user.data;
                    //                         console.log(user);
                    //                         vm.username = user.data.username;
                    //                         var newUser = {_id: vm.userId, username: vm.username};
                    //                         myFavorite.users.push(newUser);
                    //                         vm.user.favorites.push(myFavorite._id);
                    //
                    //                         FavoriteService
                    //                             .updateFavorite(myFavorite)
                    //                             .then(function (response) {
                    //
                    //                                 OdhecatonUserService
                    //                                     .updateUser(vm.userId, vm.user)
                    //                                     .then(function (response) {
                    //                                     });
                    //                             });
                    //                     });
                    //             }
                    //         });
                    // }
                // });
        }
    }
})();