/* 
 * Copyright 2016 arunsharma.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var passport = require('passport');
var User = require('./server/model/User');

module.exports = function (app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res) {
        res.render('index.ejs', {requestedURL: '/'}); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });

    app.post('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        passport.authenticate('local')(req, res, function (err) {
            console.log("user is:" + req.user);
            if(err) {
                res.json({status:"ERROR",msg:"Invalid username/password!"});
                return;
            }
                res.json({status:"OK",msg:"Done loggin!"});
            });
        
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    app.post('/signup', function (req, res) {
        User.register(new User({username: req.body.username, fName: req.body.fName, lName: req.body.lName}), req.body.password, function (err, user) {
            if (err) {
                console.log(err.json());
                res.status(500).send({status:"ERROR",msg:"Problem with data/server!"});
            }

            passport.authenticate('local')(req, res, function () {
                res.json({status:"OK",msg:"Done loggin!"});
            });

        });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });


    app.get('/plugins/*', function (req, res) {
        res.render(req.originalUrl);
    });

    //all other routes should be included here
    require('./server/plugins/routes.js')(passport);
    require('./server/projects/routes.js')(passport);
    require('./server/reports/routes.js')(passport);
    require('./server/dash/routes.js')(passport);



    app.get('*', function (req, res) {
        res.render('index.ejs', {requestedURL: req.originalUrl});
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}