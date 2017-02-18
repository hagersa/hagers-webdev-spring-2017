(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widgets/editors/widget-'+type+'-edit.view.client.html';
        }

        function updateWidget(newWidget) {
            var widget = WidgetService.updateWidget(vm.widgetId, newWidget);
            console.log(widget);
            if(widget == null) {
                vm.error = "unable to update widget";
            } else {
                vm.message = "widget successfully updated"
            }
            var url = "/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/";

            $location.url(url);
        }

        function deleteWidget (newId) {
            vm.widgets = WidgetService.deleteWidget(newId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        };
    }
})();