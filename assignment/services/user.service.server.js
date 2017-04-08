// module.exports = function (app, UserModel) {
//     var passport = require('passport');
//     var LocalStrategy = require('passport-local').Strategy;
//     var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//     var bcrypt = require("bcrypt-nodejs");
//
//     passport.serializeUser(serializeUser);
//     passport.deserializeUser(deserializeUser);
//     passport.use(new LocalStrategy(localStrategy));
//
//     var googleConfig = {
//         clientID : process.env.GOOGLE_CLIENT_ID,
//         clientSecret:  process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL : 'http://localhost:3000/auth/google/callback' //'http://localhost:3000/auth/google/callback'
//     };
//
//     app.get("/api/user", findUser);
//     // Note: findUser handles findUserByUsername and findUserByCredentials,
//     //   as specified in class
//     app.get("/api/user/:userId", findUserById);
//     app.put("/api/user/:userId", updateUser);
//     app.post("/api/user", createUser);
//     app.post ('/api/login', passport.authenticate('local'), login);
//     app.post('/api/logout', logout);
//     app.delete("/api/user/:userId", deleteUser);
//     app.post ('/api/register', register);
//     app.get ('/api/loggedin', loggedIn);
//     //login with Google
//     app.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));
//     app.get('/auth/google/callback',
//         passport.authenticate('google', {
//             successRedirect: '/assignment/#/profile',
//             failureRedirect: '/assignment/#/login'
//         }));
//
//     passport.use(new GoogleStrategy(googleConfig, googleStrategy));
//
//     function googleStrategy(token, refreshToken, profile, done) {
//         UserModel
//             .findUserByGoogleId(profile.id)
//             .then(
//                 function(user) {
//                     if(user) {
//                         return done(null, user);
//                     } else {
//                         var email = profile.emails[0].value;
//                         var emailParts = email.split("@");
//                         var newGoogleUser = {
//                             username: emailParts[0],
//                             firstName: profile.name.givenName,
//                             lastName: profile.name.familyName,
//                             email: email,
//                             google: {
//                                 id: profile.id,
//                                 token: token // used to check if authentication is still valid
//                             }
//                         };
//                         return UserModel.createUser(newGoogleUser);
//                     }
//                 },
//                 function(err) {
//                     if (err) { return done(err); }
//                 }
//             )
//             .then(
//                 function(user){
//                     return done(null, user);
//                 },
//                 function(err){
//                     if (err) { return done(err); }
//                 }
//             );
//     }
//
//
//     function serializeUser(user, done) {
//         done(null, user);
//     }
//
//     function deserializeUser(user, done) {
//         UserModel
//             .findUserById(user._id)
//             .then(
//                 function(user){
//                     done(null, user);
//                 },
//                 function(err){
//                     done(err, null);
//                 }
//             );
//     }
//
//     // checks that encrypted password and typed password match
//     function localStrategy(username, password, done) {
//         console.log("in localStrategy: "+username+" "+password);
//         UserModel
//             .findUserByCredentials(username, password)
//             .then(
//                 function(user) {
//                     console.log("user and password: "+user.username+" "+user.password);
//                     if(user.username === username && bcrypt.compareSync(password, user.password)) {
//                         console.log("success in localStrategy");
//                         return done(null, user);
//                     } else {
//                         console.log("no success in localStrategy");
//                         return done(null, false);
//                     }
//                 },
//                 function(err) {
//                     console.log("findUserByCredentials in localStrategy didn't find user");
//                     if (err) { return done(err); }
//                 }
//             )
//             .then(
//                 function(user){
//                     return done(null, user);
//                 },
//                 function(err){
//                     if (err) { return done(err); }
//                 }
//             );
//     }
//
//
//     function login(req, res) {
//         var user = req.user;
//         console.log("have user in login in service.server: "+ user);
//         res.json(user);
//     }
//
//     function logout(req, res) {
//         console.log("in service.server logout: "+req.user);
//         req.logout(); // needs parameters?
//         res.sendStatus(200);
//     }
//
//     function loggedIn(req, res) {
//         res.send(req.isAuthenticated() ? req.user : '0');
//     }
//
//     // findUser handles findUserByUsername and findUserByCredentials
//     function findUser(req, res) {
//         console.log("in findUser in service.server");
//         var username = req.query['username'];
//         var password = req.query['password'];
//         if(username && password) {
//             findUserByCredentials(req, res);
//         } else {
//             findUserByUsername(req, res);
//         }
//     }
//
//     function findUserByUsername (req, res) {
//         var username = req.query['username'];
//         console.log(username);
//
//         UserModel
//             .findUserByUsername(username)
//             .then(function (user) {
//                 console.log("in user server findUserByUsername " +user);
//                 res.json(user);
//             }, function (error) {
//                 console.log("server findUserByUsername caused a problem"+error);
//                 res.sendStatus(500)
//             });
//     }
//
//     function findUserByCredentials(req, res) {
//         var username = req.query['username'];
//         var password = req.query['password'];
//         console.log(username);
//         console.log(password);
//
//         UserModel
//             .findUserByCredentials(username, password)
//             .then(function (user) {
//                 console.log("user in findUserByCredentials: "+user);
//                 res.send(user);
//             }, function (error) {
//                 res.sendStatus(500)
//             });
//     }
//
//     function findUserById(req, res) {
//         var userId = req.params.userId;
//         console.log(userId);
//
//         UserModel
//             .findUserById(userId)
//             .then(function (user) {
//                 res.json(user);
//             }, function (error) {
//                 res.sendStatus(500)
//             });
//     }
//
//     function deleteUser(req, res) {
//         var userId = req.params.userId;
//         console.log(userId);
//
//         UserModel
//             .deleteUser(userId)
//             .then(function () {
//                 res.sendStatus(200);
//             }, function (error) {
//                 res.sendStatus(500)
//             });
//     }
//
//     function updateUser(req, res) {
//         var user = req.body;
//         var userId = req.params.userId;
//         console.log(userId);
//
//         UserModel
//             .updateUser(userId, user)
//             .then(function(response) {
//                 res.json(response);
//             }, function (error) {
//                 res.sendStatus(500);
//             });
//     }
//
//     function createUser(req, res) {
//         var newUser = req.body;
//         console.log(newUser);
//         UserModel
//             .createUser(newUser)
//             .then(function(user) {
//                 res.json(user);
//             }, function (error) {
//                 res.sendStatus(500);
//             });
//     }
//
//     // encrypts passwords upon registration
//     function register (req, res) {
//         var user = req.body;
//         console.log("have new user in service.server: "+user);
//         user.password = bcrypt.hashSync(user.password);
//         console.log("success in createUser in service.server: "+user.password);
//         UserModel
//             .createUser(user)
//             .then(function(newUser){
//                     console.log("success in createUser in service.server: "+newUser);
//                     if(newUser){
//                         req.login(newUser, function(err) {
//                             if(err) {
//                                 res.status(400).send(err);
//                             } else {
//                                 console.log("success logging new user in in service.server");
//                                 res.json(newUser);
//                             }
//                         });
//                     }
//                 }
//             );
//     }
//
//
// };