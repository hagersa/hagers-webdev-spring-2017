// (function () {
//     angular
//         .module("Odhecaton")
//         .config(configuration);
//
//     function configuration($routeProvider) {
//
//         $routeProvider
//             .when("/admin",{
//                 templateUrl: 'views/admin/templates/admin-home.view.client.html',
//                 controller: 'adminController',
//                 controllerAs: 'model',
//                 resolve: { adminUser: isAdmin }
//             })
//             .when("/login",{
//                 templateUrl: 'views/user/templates/login.view.client.html',
//                 controller: 'loginController',
//                 controllerAs: 'model'
//             })
//             .when("/register",{
//                 templateUrl: 'views/user/templates/register.view.client.html',
//                 controller: 'registerController',
//                 controllerAs: 'model'
//             })
//             // navigation to home page (library)
//             .when("/home", {
//                 templateUrl: 'views/library/templates/library-home.view.client.html',
//                 controller: 'LibraryHomeController',
//                 controllerAs: 'model',
//                 resolve: {loggedIn: checkLoggedin}
//             })
//             .when("/home/:uid", {
//                 templateUrl: 'views/library/templates/library-home.view.client.html',
//                 controller: 'LibraryHomeController',
//                 controllerAs: 'model',
//                 resolve: {loggedIn: checkLoggedin}
//             })
//             // navigation to user's editable profile
//             .when("/user/:uid/profile", {
//                 templateUrl: 'views/user/templates/profile.view.client.html',
//                 controller: 'profileController',
//                 controllerAs: 'model',
//                 resolve: {loggedIn: checkLoggedin}
//             })
//             .when("/user/:uid/newsfeed", {
//                 templateUrl: 'views/favorite/templates/newsfeed.view.client.html',
//                 controller: 'NewsfeedController',
//                 controllerAs: 'model'
//             })
//             // navigation to user's or follower's/followed view-only profile
//             .when("/user/:uid/public", {
//                 templateUrl: 'views/favorite/templates/public-profile.view.client.html',
//                 controller: 'PublicController',
//                 controllerAs: 'model'
//             })
//             .when("/user/:uid/search", {
//                 templateUrl: 'views/favorite/templates/search.view.client.html',
//                 controller: 'SearchController',
//                 controllerAs: 'model'
//             })
//             .when("/user/:uid/libary/new", {
//                 templateUrl: 'views/libary/templates/library-create-director.view.client.html',
//                 controller: 'LibraryNewController',
//                 controllerAs: 'model'
//             })
//             .when("/user/:uid/library/:lid", {
//                 templateUrl: 'views/libary/templates/library-edit-director.view.client.html',
//                 controller: 'LibraryEditController',
//                 controllerAs: 'model'
//             })
//             .when("/user/:uid/library/:lid/widget", {
//                 templateUrl: 'views/widgets/templates/widget-list.view.client.html',
//                 controller: "WidgetListController",
//                 controllerAs: "model"
//             })
//             .when("/user/:uid/library/:lid/widget/:wgid", {
//                 templateUrl: 'views/widgets/templates/widget-edit.view.client.html',
//                 controller: "WidgetEditController",
//                 controllerAs: "model"
//             })
//             // .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/search", {
//             //     templateUrl: 'views/widgets/templates/widget-flickr-search.view.client.html',
//             //     controller: "FlickrImageSearchController",
//             //     controllerAs: "model"
//             // })
//             .when("/", {
//                 templateUrl: 'views/user/templates/login.view.client.html',
//                 controller: 'loginController',
//                 controllerAs: 'model'
//             })
//             .otherwise({
//                 redirectTo: "/"
//             })
//     }
//
//     var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
//         var deferred = $q.defer();
//         $http.get('/api/loggedin').success(function(user) {
//             $rootScope.errorMessage = null;
//             if (user !== '0') {
//                 $rootScope.currentUser = user;
//                 console.log("success in config, userId in checkLoggedin function: "+ user._id);
//                 $location.url('/profile/'+user._id);
//                 deferred.resolve();
//             } else {
//                 console.log("user not logged in in checkLoggedin in config");
//                 deferred.reject();
//                 $location.url('/');
//             }
//         });
//         return deferred.promise;
//     }
// })();