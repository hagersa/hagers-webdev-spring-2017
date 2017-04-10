(function(){
    angular
        .module("Odhecaton")
        .controller("LibraryCreateController", LibraryCreateController);

    function LibraryCreateController(OdhecatonUserService, $routeParams, $location, LibraryService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createLibrary = createLibrary;

        //vm.message = 'Hello from the controller';

        function init() {
            OdhecatonUserService
                .findUserById(vm.userId)
                .success(renderUser);

            LibraryService
                .findAllDirLibrariesForUser(vm.userId)
                //.success(renderWebsites);
                .success(function (response) {
                    console.log(vm.userId);
                    console.log(response);
                    vm.dirLibraries = response;
                })
                .error(function () {
                    vm.error = 'could not render director libraries';
                });

            LibraryService
                .findAllMemLibrariesForUser(vm.userId)
                .success(function (response) {
                    console.log(vm.userId);
                    console.log(response);
                    vm.memLibraries = response;
                })
                .error(function () {
                    vm.error = 'could not render member libraries';
                });

        } init();

        function renderUser(user) {
            console.log("in library home render function: "+user);
            vm.user = user;
            console.log(user);
        }

        function createLibrary(library) {
            var newLibrary =
                {_user: vm.userId, name: vm.library.name, group: vm.library.group, description: vm.library.description};

            LibraryService
                .createLibrary(vm.userId, newLibrary)
                .success(function (response) {
                    $location.url("/user/" + vm.userId + "/library");
                })
                .error(function () {
                    vm.error = "could not create library";
                });
        }

    }
})();