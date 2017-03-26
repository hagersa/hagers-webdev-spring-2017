var app = require('../../../express');
var passport = require('passport');

//local strategy
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy)); // function allows us to configure

app.post('/api/lecture/login', passport.authenticate('local'), login);

var userModel = require('../models/user.model.server');

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials({username: username, password: password})
        .then(
            function (user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            });
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}