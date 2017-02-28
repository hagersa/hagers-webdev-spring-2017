(function () {
    angular
        .module('WebAppMaker')
        .directive('sortableDirective', sortableDir)

    function sortableDir () {
        // scope lets this talk to the outside world
        // element is a JQuery element
        function linkFunc(scope, element) {
            element.sortable({axis: 'y'}); // {axis: y} doesn't work
        }
        return {
            link: linkFunc
        };
    }
})();