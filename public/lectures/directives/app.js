(function () {
    angular
        .module('DirectiveApp', [])
        .directive('hello', helloDir)
        .directive('helloWorld', helloWorldDir)
        .directive('colorMeRed', colorMeRedDir)
        .directive('makeMeDraggable', makeMeDraggableDir)

    function makeMeDraggableDir () {
        // scope lets this talk to the outside world
        // element is a JQuery element
        function linkFunc(scope, element) {
            element.sortable({});
        }

        return {
            link: linkFunc
        };
    }

    function helloDir () {
        var config = {
            template: '<h2>Hello From Hello Directive</h2>'
            // template can contain many angular...
        };
        return config;
    }

    function helloWorldDir () {
        var config = {
            template: '<h2>Camelcased Hello World</h2>'
            // template can contain many angular...
            // OR
            // templateUrl: 'helloWorld.html'
        };
        return config;
    }

    function colorMeRedDir () {
        // scope lets this talk to the outside world
        // element is a JQuery element
        function linkFunc(scope, element) {
            console.log(element);
            element.css('color', 'red');
        }

        return {
            link: linkFunc
        };
    }
}