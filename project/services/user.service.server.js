module.exports = function (app, OdhecatonUserModel) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var bcrypt = require("bcrypt-nodejs");

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new LocalStrategy(localStrategy));

    var googleConfig = {
        clientID : process.env.GOOGLE_CLIENT_ID,
        clientSecret:  process.env.GOOGLE_CLIENT_SECRET,
        callbackURL : 'https://hagers-webdev-spring-2017.herokuapp.com/auth/google/callback' // 'http://localhost:3000/auth/google/callback' // 'https://hagers-webdev-spring-2017.herokuapp.com/auth/google/callback'
    };

    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.get("/api/user/followers/:userId", findFollowersForUser);
    app.get("/api/user/following/:userId", findFollowingForUser);
    app.post("/api/user", createUser);
    app.post('/api/isAdmin', isAdmin);
    app.get('/api/admin/users', findAllUsers);
    app.post ('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.delete("/api/user/:userId", deleteUser);
    app.post ('/api/register', register);
    app.get ('/api/loggedin', loggedIn);
    //login with Google
    app.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));
    app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/#/user/library',
        failureRedirect: '/project/#/login'
        }));

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function findFollowersForUser(req, res) {
        var userId = req.params.userId;

        OdhecatonUserModel
            .findUserById(userId)
            .then(function (user) {
                OdhecatonUserModel
                    .findFollowersForUser(user.followers)
                    .then(function (followers) {
                        res.json(followers);
                    }, function (error) {
                        res.sendStatus(500);
                    });
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function findFollowingForUser(req, res) {
        var userId = req.params.userId;

        OdhecatonUserModel
            .findUserById(userId)
            .then(function (user) {
                OdhecatonUserModel
                    .findFollowingForUser(user.following)
                    .then(function (following) {
                        res.json(following);
                    }, function (error) {
                        res.sendStatus(500);
                    });
            }, function (error) {
                res.sendStatus(500);
            });

    }

    function googleStrategy(token, refreshToken, profile, done) {
        OdhecatonUserModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    // console.log("user in googleStrategy: "+user);
                    if(user) {
                        // console.log("logging in existing: "+user);
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username: emailParts[0],
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: email,
                            password: "google", //this
                            followers: [], //this
                            following: [], //this
                            favorites: [], //this
                            aboutMe: "", //this
                            dirLibraries: [], //this
                            memLibraries: [], //this
                            google: {
                                id: profile.id,
                                token: token // used to check if authentication is still valid
                            },
                            role: 'MEMBER'
                        };
                        return OdhecatonUserModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        OdhecatonUserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    // checks that encrypted password and typed password match
    function localStrategy(username, password, done) {
        OdhecatonUserModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user.username === username && bcrypt.compareSync(password, user.password)) { // && bcrypt.compareSync(password, user.password
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    // var firstUser = {username: 'new', password: 'new', firstName: 'Sarah', role: 'ADMIN', email: 'sarah@sarah.com'};
    // firstUser.password = bcrypt.hashSync(firstUser.password);
    // OdhecatonUserModel.createUser(firstUser); //{username: 'sarah', password: 'sarah', firstName: 'Sarah', role: 'ADMIN'}

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout(); // needs parameters?
        res.sendStatus(200);
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function isAdmin(req, res) {
        res.send(req.isAuthenticated() && req.user.role == 'ADMIN' ? req.user : '0');
    }

    function findAllUsers(req, res) {
            OdhecatonUserModel
                .findAllUsers()
                .then(function (users) {
                    res.json(users);
                });
    }

    // findUser handles findUserByUsername and findUserByCredentials
    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(req, res);
        } else {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername (req, res) {
        var username = req.query['username'];

        OdhecatonUserModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        OdhecatonUserModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.send(user);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;

        OdhecatonUserModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500)
            });
    }


    function deleteUser(req, res) {
        var userId = req.params.userId;

        OdhecatonUserModel
            .deleteUser(userId)
            .then(function () {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(500)
            });
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.userId;

        OdhecatonUserModel
            .updateUser(userId, user)
            .then(function(response) {
                res.json(response);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    function createUser(req, res) {
        var newUser = req.body;

        OdhecatonUserModel
            .createUser(newUser)
            .then(function(user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    // encrypts passwords upon registration
    function register (req, res) {
        var user = req.body;

        user.password = bcrypt.hashSync(user.password);

        OdhecatonUserModel
            .createUser(user)
            .then(function(newUser){
                if(newUser){
                    req.login(newUser, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(newUser);
                        }
                    });
                }
            }
        );
    }
};
