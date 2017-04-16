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
        //vm.myUrl =

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

            LibraryService
                .findLibraryById(vm.libraryId)
                .success(function (library) {
                    var widgetIds = library.widgets;
                    var widgetObjects = [];
                    console.log(widgetIds);
                    console.log(widgetObjects);

                    for(var w in widgetIds) {
                        console.log("widgetId is :" + widgetIds[w]);
                        WidgetService
                            .findWidgetById(widgetIds[w])
                            .success(function (widget) {
                                console.log("found widget object: "+widget);
                                widgetObjects.push(widget);
                                console.log(widgetObjects);
                            })
                            .error(function () {
                                console.log("error in finding widget");

                            });
                    }
                    vm.widgets = widgetObjects;
                })
                .error(function () {

                });
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

        function getTrustedHtml(url) {
            // http://docs.google.com/gview?url=http://domain.com/{{widget.url}}&embedded=true
            // var wholeUrl = "http://docs.google.com/gview?url=http://domain.com"+url+"&embedded=true";
            //return $sce.trustAsHtml(wholeUrl);
            return $sce.trustAsResourceUrl(url);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();