(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;

        // bad way to make widget list sortable
        // $(".widget-list").sortable({
        //     axis: "y"
        // });

        function init() {
            WidgetService
                .findAllWidgetsForPage(vm.pageId)
                .success(renderWidgets);
        }
        init();

        function renderWidgets(widgets) {
            vm.widgets = widgets;
            console.log(widgets);
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

// client-side init function
// function init() {
//     vm.widgets = WidgetService.findAllWidgets(vm.pageId);
// }
// init();