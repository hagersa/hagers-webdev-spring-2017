module.exports = function (app) {

    //var model = require("./models/models.server.js")();
    var userModel = require('./models/user/user.model.server.js')();
    var websiteModel = require('./models/website/website.model.server.js')(userModel);
    //var pageModel = require('./models/page/page.model.server')(websiteModel);

    require('./services/user.service.server.js')(app, userModel);
    //var userService = require('./services/user.service.server.js')(app, model); // if using singleton
    require("./services/website.service.server.js")(app, websiteModel);
    require("./services/page.service.server.js")(app); // add , pageModel
    require("./services/widget.service.server.js")(app);
};
