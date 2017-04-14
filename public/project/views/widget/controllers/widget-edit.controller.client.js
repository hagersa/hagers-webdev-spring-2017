(function(){
    angular
        .module("Odhecaton")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($location, $routeParams, WidgetService) { //
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.libraryId = $routeParams.lid;
        vm.widgetId = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.renderWidget = renderWidget;
        vm.upload = upload;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(renderWidget);

            vm.widgets = WidgetService.findAllWidgetsForLibrary(vm.libraryId);
        }
        init();

        function renderWidget(widget) {
            vm.widget = widget;
        }

        function upload() {

        }

        function updateWidget(newWidget) {
            WidgetService
                .updateWidget(vm.widgetId, newWidget)
                .success(function (response) {
                    $location.url("/user/" + vm.userId + "/library/" + vm.libraryId + "/widget/director");
                })
                .error(function () {
                    vm.error = "unable to update widget";
                });
        }

        function deleteWidget(widgetId) {
            var answer = confirm("Are you sure?");
            if(answer) {
                WidgetService
                    .deleteWidget(widgetId)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/library/" + vm.libraryId +"/widget/director");
                    })
                    .error(function () {
                        vm.error = 'unable to delete website';
                    });
            }
        }
    }
})();