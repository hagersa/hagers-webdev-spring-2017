(function(){
    angular
        .module("Odhecaton")
        .controller("LibraryShareController", LibraryShareController);

    function LibraryShareController(OdhecatonUserService, $routeParams, $location, LibraryService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.libraryId = $routeParams.lid;
        vm.addMember = addMember;
        vm.deleteMember = deleteMember;
        vm.deleteAllMembers = deleteAllMembers;

        function init() {

            LibraryService
                .findAllDirLibrariesForUser(vm.userId)
                .success(renderDirLibraries);

            LibraryService
                .findAllMemLibrariesForUser(vm.userId)
                .success(renderMemLibraries);

            LibraryService
                .findLibraryById(vm.libraryId)
                .success(renderLibrary);
        } init();

        function renderDirLibraries(dirLibraries) {
            vm.dirLibraries = dirLibraries;
        }

        function renderMemLibraries(memLibraries) {
            vm.memLibraries = memLibraries;
        }

        function renderLibrary(library) {
            vm.library = library;
        }

        function addMember(email) {
            // console.log("entering addMember in Controller with email: "+email);
            var updatedLibrary = vm.library;
            updatedLibrary.members.push(email);

            LibraryService
                .updateLibrary(vm.libraryId, updatedLibrary)
                .success(function (response) {
                    // console.log("success in controller, redirecting");
                    $location.url("/user/" + vm.userId + "/library/" + vm.libraryId + "/share");
                })
                .error(function () {
                    // console.log('error in controller');
                    vm.error = "unable to add email address";
                });
        }

        function deleteMember(email) {
            // console.log("entering deleteMember in Controller with email: "+email);
            var updatedLibrary = vm.library;
            var index = updatedLibrary.members.indexOf(email);

            if (index > -1) {
                updatedLibrary.members.splice(index, 1);
            }

            LibraryService
                .updateLibrary(vm.libraryId, updatedLibrary)
                .success(function (response) {
                    // console.log("success in controller, redirecting");
                    $location.url("/user/" + vm.userId + "/library/" + vm.libraryId + "/share");
                })
                .error(function () {
                    // console.log('error in controller');
                    vm.error = "unable to remove email address";
                });
        }

        function deleteAllMembers(members) {
            // console.log("entering deleteAllMembers in Controller with members: "+members);
            var updatedLibrary = vm.library;

            updatedLibrary.members = [];

            LibraryService
                .updateLibrary(vm.libraryId, updatedLibrary)
                .success(function (response) {
                    // console.log("success in controller, redirecting");
                    $location.url("/user/" + vm.userId + "/library/" + vm.libraryId + "/share");
                })
                .error(function () {
                    // console.log('error in controller');
                    vm.error = "unable to remove email address";
                });
        }
    }
})();