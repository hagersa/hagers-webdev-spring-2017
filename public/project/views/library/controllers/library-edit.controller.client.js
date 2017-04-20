(function(){
    angular
        .module("Odhecaton")
        .controller("LibraryEditController", LibraryEditController);

    function LibraryEditController(OdhecatonUserService, $routeParams, $location, LibraryService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.libraryId = $routeParams.lid;
        vm.deleteLibrary = deleteLibrary;
        vm.updateLibrary = updateLibrary;

        //vm.message = 'Hello from the controller';

        function init() {
            OdhecatonUserService
                .findUserById(vm.userId)
                .success(renderUser);

            LibraryService
                .findAllDirLibrariesForUser(vm.userId)
                .success(renderDirLibraries);

            LibraryService
                .findAllMemLibrariesForUser(vm.userId)
                .success(renderMemLibraries);

            // LibraryService
            //     .findAllMemLibrariesForUser(vm.userId)
            //     .success(renderMemLibraries);

            LibraryService
                .findLibraryById(vm.libraryId)
                .success(renderLibrary);

        } init();

        function renderUser(user) {
            console.log("in library share render function: "+user);
            vm.user = user;
            console.log(user);
        }

        function renderLibrary(library) {
            vm.library = library;
        }

        function renderDirLibraries(dirLibraries) {
            vm.dirLibraries = dirLibraries;
        }

        function renderMemLibraries(memLibraries) {
            vm.memLibraries = memLibraries;
        }

        function updateLibrary(library) {
            if(library.name && library.group) {
                LibraryService
                    .updateLibrary(vm.libraryId, library)
                    .success(function (response) {
                        $location.url("/user/" + vm.userId + "/library");
                    })
                    .error(function () {
                        vm.error = "unable to update website";
                    });
            } else {
                vm.error = "name and group are required"
            }
        }

        function deleteLibrary (libraryId) {
            var answer = confirm("Are you sure?");

            if(answer) {
                LibraryService
                    .deleteLibrary(libraryId)
                    .success(function () {
                        $location.url("/user/"+vm.userId+"/library");
                    })
                    .error(function () {
                        vm.error = 'unable to delete library';
                    });
            }
        }
    }
})();