(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, $location, WidgetService) { //$sce
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.createWidget = createWidget;

        function init() {
            vm.widgets = WidgetService.findAllWidgetsForPage(vm.pageId);
        }
        init();

        function createWidget(type) {
            var newWidget = { widgetType : type};

            WidgetService
                .createWidget(vm.pageId, newWidget)
                .success(function (newWidget) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+newWidget._id);
                })
                .error(function () {
                    vm.error = "could not create widget";
                });
        }
    }
})();

// function getWidgetTemplateUrl(widgetType) {
//     var url = 'views/widget/templates/widget-'+widgetType+'.view.client.html';
//     return url;
// }
//
// function getTrustedHtml(html) {
//     return $sce.trustAsHtml(html);
// }
//
// function getYouTubeEmbedUrl(widgetUrl) {
//     var urlParts = widgetUrl.split('/');
//     var id = urlParts[urlParts.length - 1];
//     var url = "https://www.youtube.com/embed/"+id;
//     return $sce.trustAsResourceUrl(url);
// }