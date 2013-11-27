/* global define */
/* global Backbone */
/* global $ */

define(function(require, exports, module) {

    //var LoginModel = require('models/Login');
    var LoginTemplate = require('tpl!templates/login.jst');

    var Login = Backbone.View.extend({

        el: '#container',

        //events: { },

        initialize: function () {
            //this.model = new LoginModel();            
            //Backbone.Validation.bind(this);
        },

        render: function() {
            this.$el.html(LoginTemplate());
            return this;
        }

    });

    return Login;
});
