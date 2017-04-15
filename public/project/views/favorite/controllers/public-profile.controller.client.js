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
        vm.favoriteUser = favoriteUser;
        // vm.findFavoritesForUser = findFavoritesForUser;

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
                .findUserById(vm.followId)
                .success(function (user) {
                    vm.user._id = user._id;

                    OdhecatonUserService
                        .findFollowersForUser(vm.user._id)
                        .success(function (followers) {
                            console.log("followers:");
                            console.log(followers);
                            vm.followers = followers;
                        })
                        .error(function () {});
                })
                .error(function () {
                    vm.error = 'could not find user';
                });

            OdhecatonUserService
                .findUserById(vm.followId)
                .success(function (user) {
                    vm.user._id = user._id;

                    OdhecatonUserService
                        .findFollowingForUser(vm.user._id)
                        .success(function (following) {
                            console.log("Following:");
                            console.log(following);
                            vm.following = following;
                        })
                        .error(function () {});
                })
                .error(function () {
                    vm.error = 'could not find user';
                });

            FavoriteService
                .findFavoritesForUser(vm.followId)
                //.success(renderWebsites);
                .success(function (response) {
                    console.log("success");
                    console.log(vm.userId);
                    console.log(response);
                    vm.favorites = response;
                })
                .error(function () {
                    console.log("error");
                    vm.error = 'could not render favorites';
                });

        } init();


        // function findFavoritesForUser(userId) {
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

        // function favoriteUser(followId) {
        //
        //     console.log("userId I want to follow: "+followId);
        //     OdhecatonUserService
        //         .findUserById(followId)
        //         .then(function (notMe) {
        //             var follow = notMe.data;
        //
        //             console.log("found follow user");
        //             console.log(follow);
        //
        //
        //             OdhecatonUserService
        //                 .findUserById(vm.userId)
        //                 .then(function (isMe) {
        //                     console.log("me: ");
        //                     console.log(isMe);
        //                     var currentUser = isMe.data;
        //
        //
        //                     currentUser.following.push(follow._id);
        //
        //                     console.log("following: ");
        //                     console.log(currentUser.following);
        //
        //                     OdhecatonUserService
        //                         .updateUser(vm.userId, currentUser)
        //
        // .then(function (response) {
        //                             console.log("user I'm following: "+ follow);
        //                             follow.followers.push(vm.userId);
        //
        //                             console.log("follow:");
        //                             console.log(follow.followers);
        //
        //                             console.log("users followers: "+follow.followers);
        //
        //                             OdhecatonUserService
        //                                 .updateUser(follow._id, follow)
        //                                 .then(function (response) {
        //                                     console.log("success in controller");
        //                                 })
        //                         });
        //                 });
        //         });
        //
        // }

        function favoriteUser(followId) {

            // console.log("new favorite is: "+newFavorite);

            OdhecatonUserService
                .findUserById(followId)
                .then(function (response) {

                    if (response.data != null) {
                        vm.userImFollowing = response.data;

                        OdhecatonUserService
                            .findUserById(vm.userId)
                            .then(function (response) {
                                vm.thisUser = response.data;

                                vm.thisUser.following.push(vm.userImFollowing._id);
                                vm.userImFollowing.followers.push(vm.thisUser._id);

                                OdhecatonUserService
                                    .updateUser(vm.userImFollowing._id, vm.userImFollowing)
                                    .then(function (response) {
                                        // add logic to prevent a favorite from being added twice
                                        OdhecatonUserService
                                            .updateUser(vm.thisUser._id, vm.thisUser)
                                            .then(function (response) {
                                            });
                                    });
                            });
                    } else {
                       vm.error = "could not add user to Favorites";
                    }
                });
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