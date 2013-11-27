/* global define */

define(function(require, exports, module) {
    var _ = require('underscore'),
        Backbone = require('backbone'),
        LoginApp = require('app'),
        Plugins = require('plugins');


    window.app = LoginApp;
	$(function(){
        window.app.initialize();
        delete window.app.initialize;
        window.app.views.loginView.render();
    });
});
