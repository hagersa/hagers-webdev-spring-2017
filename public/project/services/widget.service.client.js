(function () {
    angular
        .module("Odhecaton")
        .service("WidgetService", widgetService);

    function widgetService($http) {

        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.findAllWidgetsForLibrary = findAllWidgetsForLibrary;
        this.uploadImage = uploadImage;
        // this.updateWidgetImage = updateWidgetImage;
        this.sort = sort;

        function sort(libraryId, start, end) {
            var url = "/api/library/"+libraryId+"/widget?start=index1&end=index2";
            url = url
                .replace("index1", start)
                .replace("index2", end);
            return $http.put(url);
        }

        function uploadImage() {
            return $http.post("/api/upload");
        }

        function createWidget(libraryId, widget) {
            return $http.post("/api/library/"+libraryId+"/widget", widget);
        }

        function findAllWidgetsForLibrary(libraryId) {
            return $http.get("/api/library/"+libraryId+"/widget");
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