(function(){
    angular
        .module("Odhecaton")
        .controller("InfoController", InfoController);

    function InfoController($sce, $location, $routeParams, YoutubeService, OdhecatonUserService, FavoriteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.videoId = $routeParams.fid;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.favoriteVideo = favoriteVideo;
        vm.favoriteUser = favoriteUser;

        console.log("videoId is!!!!!!!! "+ vm.videoId);

        function init() {
            FavoriteService
                .findFavoriteByVideoId(vm.videoId)
                .success(function (favorite) {
                    if(favorite !== null) {
                        vm.favorite = favorite;
                        console.log("have favorite object!!!! " + vm.favorite);


                        var favoriteUsersArray = favorite.users;
                        console.log("have fave users array!!!! " + favoriteUsersArray);

                        var favoriteUsersTemp = [];

                        for (var u in favoriteUsersArray) {
                            OdhecatonUserService
                                .findUserById(favoriteUsersArray[u]._id)
                                .success(function (user) {
                                    favoriteUsersTemp.push(user);
                                })
                                .error(function () {
                                    console.log = "could not render users";
                                });
                        }
                        vm.favoriteUsers = favoriteUsersTemp;
                        console.log("favorite users!!!!!! " + vm.favoriteUsers);

                    } else {
                        vm.favorite = favorite;
                        vm.error = "Please favorite this video to see more details";
                    }

                })
                .error(function () {
                    console.log("OOPS!");
                    vm.error = 'could not find video';
                });
        } init();

        function getYouTubeEmbedUrl(videoId) {
            var url = "https://www.youtube.com/embed/"+videoId;
            return $sce.trustAsResourceUrl(url);
        }

        function favoriteVideo(videoId) {

            var newFavorite = {
                videoId: video.videoId,
                title: video.title,
                description: video.description,
                channelTitle: video.channelTitle,
                publishedAt: video.publishedAt
            };

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

    }
})();