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

        function updateLibrary (newLibrary) {
            LibraryService
                .updateLibrary(vm.libraryId, newLibrary)
                .success(function (response) {
                    $location.url("/user/" + vm.userId + "/library");
                })
                .error(function () {
                    vm.error = "unable to update library";
                });
        }

    }
})();