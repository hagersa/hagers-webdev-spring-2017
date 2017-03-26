(function () {
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
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
            .when("/profile/:uid",{
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website",{
                templateUrl: 'views/websites/templates/website-list.view.client.html',
                controller: 'WebsiteListController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/new",{
                templateUrl: 'views/websites/templates/website-new.view.client.html',
                controller: 'WebsiteNewController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid",{
                templateUrl: 'views/websites/templates/website-edit.view.client.html',
                controller: 'WebsiteEditController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page",{
                templateUrl: 'views/pages/templates/page-list.view.client.html',
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new",{
                templateUrl: 'views/pages/templates/page-new.view.client.html',
                controller: "PageNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid",{
                templateUrl: 'views/pages/templates/page-edit.view.client.html',
                controller: "PageEditController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget",{
                templateUrl: 'views/widgets/templates/widget-list.view.client.html',
                controller: "WidgetListController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget/new",{
                templateUrl: 'views/widgets/templates/widget-choose.view.client.html',
                controller: "WidgetNewController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid",{
                templateUrl: 'views/widgets/templates/widget-edit.view.client.html',
                controller: "WidgetEditController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/search",{
                templateUrl: 'views/widgets/templates/widget-flickr-search.view.client.html',
                controller: "FlickrImageSearchController",
                controllerAs: "model"
            })

            .when("/", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .otherwise ( {
                redirectTo: "/"
            })

    }

})();