(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($sce, $routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.createWidget = createWidget;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;

        function init() {
            vm.widgets = WidgetService.findAllWidgets(vm.pageId);
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widgets/editors/widget-'+type+'-edit.view.client.html';
        }

        function createWidget(type) {
            var newWidget = { widgetType : type};

            var widget = WidgetService.createWidget(vm.pageId, newWidget);

            var url = "/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id;

            console.log(url);
            $location.url(url);
        }

        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-'+widgetType+'.view.client.html';
            return url;
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();