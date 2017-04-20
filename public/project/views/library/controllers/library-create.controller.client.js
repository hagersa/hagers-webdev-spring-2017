(function(){
    angular
        .module("Odhecaton")
        .controller("LibraryCreateController", LibraryCreateController);

    function LibraryCreateController(OdhecatonUserService, $routeParams, $location, LibraryService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        //vm.libraryId = $routeParams.lid;
        vm.createLibrary = createLibrary;

        //vm.message = 'Hello from the controller';

        function init() {
            // OdhecatonUserService
            //     .findUserById(vm.userId)
            //     .success(renderUser);

            LibraryService
                .findAllDirLibrariesForUser(vm.userId)
                .success(renderDirLibraries);

            LibraryService
                .findAllMemLibrariesForUser(vm.userId)
                .success(renderMemLibraries);

            // LibraryService
            //     .findAllMemLibrariesForUser(vm.userId)
            //     .success(renderMemLibraries);

        } init();

        // function renderUser(user) {
        //     console.log("in library home render function: "+user);
        //     vm.user = user;
        //     console.log(user);
        // }

        function renderDirLibraries(dirLibraries) {
            vm.dirLibraries = dirLibraries;
        }

        function renderMemLibraries(memLibraries) {
            vm.memLibraries = memLibraries;
        }

        function createLibrary(library) {
            var newLibrary =
                {_user: vm.userId, name: vm.library.name, group: vm.library.group, description: vm.library.description};

            if(library.name && library.group) {
            LibraryService
                .createLibrary(vm.userId, newLibrary)
                .success(function (response) {
                    $location.url("/user/" + vm.userId + "/library");
                })
                .error(function () {
                    vm.error = "could not create library";
                });
            } else {
                vm.error = "name and group are required";
            }
        }

    }
})();