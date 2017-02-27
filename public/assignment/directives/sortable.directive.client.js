(function () {
    angular
        .module('WebAppMaker', [])
        .directive('sortableDirective', sortableDirective)

    function sortableDirective () {
        // scope lets this talk to the outside world
        // element is a JQuery element
        function linkFunc(scope, element) {
            element.sortable({});
        }

        return {
            link: linkFunc
        };
    }
}();