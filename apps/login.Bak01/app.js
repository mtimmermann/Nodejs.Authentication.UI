/* global define */
/* global Backbone */

define(function(require, exports, module) {

    var LoginView = require('views/Login');
    //    ForgotPasswordView = require('views/ForgotPassword');
        
    // boot the app 
    var app = {};
    app.views = {};

    app.initialize = function() {
        //app.views.forgotPasswordView = new ForgotPasswordView();
        app.views.loginView = new LoginView();
    };

    Backbone.history.start();

    return app;
});
