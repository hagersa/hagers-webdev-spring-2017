(function () {
    angular
        .module('WebAppMaker')
        .directive('sortableDirective', sortableDir);

    function sortableDir () {
        // scope lets this talk to the outside world
        // element is a JQuery element
        function linkFunc(scope, element, attributes) {
            var start = -1;
            var end = -1;
            element
                .sortable({
                    axis: 'y',
                    start: function (event, ui) {
                        start = $(ui.item).index();
                    },
                    stop: function (event, ui) {
                        end = $(ui.item).index();
                        //scope.WidgetListController.sort(start, end);
                        scope.callback({start:start, end:end});
                    }
                });
        }

        return {
            scope: {
                callback: '&'
            },
            link: linkFunc
            // controller: WidgetListController,
            // controllerAs: 'WidgetListController'
        }
    }

        /*function  sortableController(WidgetService) {
         var vm = this;
         vm.sort = sort;

         function sort(start, end) {
         WidgetService.sort(start, end);
         }
         }*/
})();