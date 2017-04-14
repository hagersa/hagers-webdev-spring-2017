(function () {
    angular
        .module("Odhecaton")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when("/user/:uid/admin",{
                templateUrl: 'views/admin/templates/admin-home.view.client.html',
                controller: 'AdminHomeController',
                controllerAs: 'model',
                resolve: { adminUser: isAdmin }
            })
            .when("/login",{
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when("/register",{
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when("/user/profile", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {loggedIn: checkLoggedin}
            })
            // navigation to user's editable profile
            .when("/user/:uid/profile", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {loggedIn: checkLoggedin}
            })
            // navigation to library home page
            .when("/user/library", {
                templateUrl: 'views/library/templates/library-home.view.client.html',
                controller: 'LibraryHomeController',
                controllerAs: 'model',
                resolve: {loggedIn: checkHomeLoggedin}
            })
            .when("/user/:uid/library", {
                templateUrl: 'views/library/templates/library-home.view.client.html',
                controller: 'LibraryHomeController',
                controllerAs: 'model',
                resolve: {loggedIn: checkHomeLoggedin}
            })
            .when("/user/:uid/library/new", {
                templateUrl: 'views/library/templates/library-create.view.client.html',
                controller: 'LibraryCreateController',
                controllerAs: 'model'
            })
            .when("/user/:uid/library/:lid", {
                templateUrl: 'views/library/templates/library-edit.view.client.html',
                controller: 'LibraryEditController',
                controllerAs: 'model'
            })
            // for widget view and editing
            .when("/user/:uid/library/:lid/widget/director", {
                templateUrl: 'views/widget/templates/widget-list-director.view.client.html',
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/library/:lid/widget/member", {
                templateUrl: 'views/widget/templates/widget-list-member.view.client.html',
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/library/:lid/widget/:wgid", {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: "WidgetEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/library/:lid/share", {
                templateUrl: 'views/library/templates/library-share.view.client.html',
                controller: 'LibraryEditController',
                controllerAs: 'model'
            })
            // social media
            .when("/user/:uid/newsfeed", {
                templateUrl: 'views/favorite/templates/newsfeed.view.client.html',
                controller: 'YoutubeSearchController',
                controllerAs: 'model'
            })
            // navigation to user's or follower's/followed view-only profile
            .when("/user/:uid/favorite/:pid", {
                templateUrl: 'views/favorite/templates/public-profile.view.client.html',
                controller: 'PublicProfileController',
                controllerAs: 'model'
            })
            // logged in search page
            .when("/user/:uid/search", {
                templateUrl: 'views/favorite/templates/search.view.client.html',
                controller: 'YoutubeSearchController',
                controllerAs: 'model'
            })
            // public search page
            .when("/user/search/:searchText", {
                templateUrl: 'views/favorite/templates/search-public.view.client.html',
                controller: 'YoutubePublicSearchController',
                controllerAs: 'model'
            })
            // .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/search", {
            //     templateUrl: 'views/widgets/templates/widget-flickr-search.view.client.html',
            //     controller: "FlickrImageSearchController",
            //     controllerAs: "model"
            // })
            .when("/", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            // .when("/homepage", {
            //     templateUrl: '../../index.html'
            // })
            .otherwise({
                redirectTo: "/"
            })
    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
                // console.log("success in config, userId in checkLoggedin function: "+ user._id);
                $location.url('user/'+user._id+'/profile');
                deferred.resolve();
            } else {
                // console.log("user not logged in in checkLoggedin in config");
                deferred.reject();
                $location.url('/');
            }
        });
        return deferred.promise;
    }

    var checkHomeLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
                // console.log("success in config, userId in checkHomeLoggedin function: "+ user._id);
                $location.url('user/'+user._id+'/library');
                deferred.resolve();
            } else {
                // console.log("user not logged in in checkLoggedin in config");
                deferred.reject();
                $location.url('/');
            }
        });
        return deferred.promise;
    }

    var isAdmin = function($q, $timeout, $http, $location, $rootScope, OdhecatonUserService) {
        var deferred = $q.defer();
        OdhecatonUserService
            .isAdmin()
            .then(function (user) {
                if(user == '0') {
                    deferred.reject();
                    $location.url('/profile')
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
})();