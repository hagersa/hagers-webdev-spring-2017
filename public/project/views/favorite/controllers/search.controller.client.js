(function(){
    angular
        .module("Odhecaton")
        .controller("YoutubeSearchController", YoutubeSearchController);

    function YoutubeSearchController($sce, $location, $routeParams, YoutubeService, OdhecatonUserService, FavoriteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.searchVideo = searchVideo;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.favoriteVideo = favoriteVideo;
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

            // FavoriteService
            //     .findNewFavorites()
            //     .success(function (favorites) {
            //         console.log("in controller");
            //         vm.newVideos = favorites;
            //     })
            //     .error(function () {
            //         vm.error = "unable to render users";
            //     });



            // OdhecatonUserService
            //     .findUserById(vm.userId)
            //     .success(renderUser)
            //     .error(function () {});

            // OdhecatonUserService
            //     .findAllUsers()
            //     .success(renderUsers)
            //     .error(function () {});
            //
            // showNewFavorites();

        } init();

        function renderFavorites(favorites) {
            vm.favorites = favorites;
        }

        // function renderFavorites(favorites) {
        //     console.log("in rendering");
        //     vm.newVideos = favorites;
        // }

        // FavoriteService
        //     .findNewFavorites()
        //     .success(function (response) {
        //         console.log("response: "+response);
        //         vm.newVideos = response;
        //     })
        //     .error(function () {
        //         console.log("ERROR!");
        //     });

        // function renderUsers(users) {
        //     vm.users = users;
        // }

        // function videosForUser(favorites) {
        //     vm.index = (favorites.length - 1);
        //     if(vm.index > 0) {
        //         vm.fave = favorites[vm.index];
        //
        //         FavoriteService
        //             .findFavoriteById(vm.fave._id)
        //             .success(function (response) {
        //                 vm.userVideo = response;
        //             })
        //             .error(function (response) {
        //                 vm.error = "oops, something went wrong!";
        //             });
        //     }
        // }

        // function showNewFavorites() {
        //     vm.newFavoritesUsers = [];
        //
        //     OdhecatonUserService
        //         .findAllUsers()
        //         .success(function (users) {
        //             console.log(users);
        //             // for(user in users) {
        //                 // if(r.favorites.length > 0) {
        //                     vm.newFavoritesUsers = users;
        //                 // }
        //             // }
        //             return vm.newFavoritesUsers;
        //         })
        //         .error(function () {
        //             vm.error = "no users with favorites";
        //         });
        //
        // }

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
            // var x = document.getElementById('favorite');
            // var y = document.getElementById('unfavorite');
            //
            // x.style.display = 'none';
            // y.style.display = 'block';
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
                                    // var newUser = {_id: vm.userId, username: vm.username};
                                    //
                                    // vm.user.favorites.push(favoriteId);
                                    // myFavorite.users.push(newUser);

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