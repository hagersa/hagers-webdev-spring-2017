(function(){
    angular
        .module("Odhecaton")
        .controller("LibraryHomeController", LibraryHomeController);

    function LibraryHomeController(OdhecatonUserService, $routeParams, $location, LibraryService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        function init() {
            OdhecatonUserService
                .findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                    vm.user.email = user.email;
                })
                .error(function () {
                    vm.error = 'could not find user'
                });


            LibraryService
                    .findAllDirLibrariesForUser(vm.userId)
                    //.success(renderWebsites);
                    .success(function (response) {
                        // console.log(vm.userId);
                        // console.log(response);
                        vm.dirLibraries = response;
                    })
                    .error(function () {
                        vm.error = 'could not render director libraries';
                    });

            LibraryService
                .findAllMemLibrariesForUser(vm.userId)
                .success(function (libraries) {
                    console.log(vm.user);
                    console.log(libraries);
                    vm.myLibraries = libraries;
                })
                .error(function () {
                    vm.error = 'could not render member libraries';
                });

        } init();

        // function renderUser(user) {
        //     console.log("in library home render function: "+user);
        //     vm.user = user;
        //     console.log(user);
        // }
        // function init() {
        //     vm.message = 'Hello from the controller'
        //     // LibraryService
        //     //     .findAllLibrariesForUser(vm.userId)
        //     //     //.success(renderWebsites);
        //     //     .success(function (response) {
        //     //         console.log(vm.userId);
        //     //         console.log(response);
        //     //         vm.libraries = response;
        //     //     })
        //     //     .error(function () {
        //     //         vm.error = 'could not render libraries';
        //     //     });
        // }
        // init();

        // function renderWebsites(websites) {
        //     vm.websites = websites;
        // }
    }
})();