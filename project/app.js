module.exports = function (app) {

    var userModel = require('./models/user/user.model.server.js')();
    var libraryModel = require('./models/library/library.model.server.js')(userModel);
    var socialModel = require('./models/social/social.model.server')(); // dependencies?
    var widgetModel = require('./models/widget/widget.model.server')(libraryModel);

    require('./services/user.service.server.js')(app, userModel);
    require("./services/library.service.server.js")(app, libraryModel);
    require("./services/social.service.server.js")(app, socialModel);
    require("./services/widget.service.server.js")(app, widgetModel);
};
