(function(){
    angular
        .module("Odhecaton")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, OdhecatonUserService, $routeParams, $location, LibraryService, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.libraryId = $routeParams.lid;
        vm.createWidget = createWidget;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.sort = sort;

        function init() {
            OdhecatonUserService
                .findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                })
                .error(function () {
                    vm.error = 'could not find user'
                });

            // iterate over library.widgets

            WidgetService
                .findAllWidgetsForLibrary(vm.libraryId)
                .success(renderWidgets);
        } init();

        function renderWidgets(widgets) {
            console.log(widgets);
            vm.widgets = widgets;
        }

        function createWidget(type) {
            var newWidget = { widgetType : type};

            WidgetService
                .createWidget(vm.libraryId, newWidget)
                .success(function (newWidget) {
                    console.log("widgetType is :" + newWidget.widgetType)
                    $location.url("/user/" + vm.userId + "/library/" + vm.libraryId + "/widget/"+newWidget._id);
                })
                .error(function () {
                    vm.error = "could not create widget";
                });
        }

        function sort(start, end) {
            WidgetService
                .sort(vm.libraryId, start, end)
                .success(function () {
                    console.log('yay');
                    // $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function () {
                    vm.error = "could not update order";
                });
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