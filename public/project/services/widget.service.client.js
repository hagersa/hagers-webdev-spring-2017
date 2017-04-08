(function () {
    angular
        .module("Odhecaton")
        .service("WidgetService", widgetService);

    function widgetService($http) {

        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.findAllWidgetsForPage = findAllWidgetsForPage;
        this.uploadImage = uploadImage;
        // this.updateWidgetImage = updateWidgetImage;
        this.sort = sort;

        function sort(pageId, start, end) {
            var url = "/api/page/"+pageId+"/widget?start=index1&end=index2";
            url = url
                .replace("index1", start)
                .replace("index2", end);
            return $http.put(url);
        }

        function uploadImage() {
            return $http.post("/api/upload");
        }

        function createWidget(pageId, widget) {
            return $http.post("/api/page/"+pageId+"/widget", widget);
        }

        function findAllWidgetsForPage(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
        }

        function updateWidget(widgetId, newWidget) {
            return $http.put("/api/widget/"+widgetId, newWidget);
        }

        /*function updateWidgetImage(widgetId, newWidget) {
            return $http.put("/api/widget/"+widgetId, newWidget);
        }*/

        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/"+widgetId);
        }
    }
})();

// This function is redundant, but was used in assignment3
// this.findWidgetsByPageId = findWidgetsByPageId;
// function findWidgetsByPageId(pageId) {
//     for(var w in widgets) {
//         if(widgets[w].pageId === pageId) {
//             return angular.copy(widgets[w]);
//         }
//     }
//     return null;
//
// }