define(function(require, exports, module) {

	var HeaderTemplate = require('tpl!templates/header.jst');

    // Header View
    return Backbone.Marionette.ItemView.extend({

    	events: {
    		'click [data-header-link="about"]': 'linkSelect',
    		'click [data-header-link="index"]': 'linkSelect',
            'click [data-header-link="logout"]': 'logout'
    	},

        template: HeaderTemplate,

        //initialize: function() { },

        linkSelect: function(e) {
        	var ele = $(e.currentTarget);
        	if (ele.data('header-link')) {
        		this.$('[data-header-link]').removeClass('active');
        		ele.addClass('active');
        	}
        },

        setActiveLink: function(link) {
        	this.$('[data-header-link]').removeClass('active');
            if (link && link !== 'none') {
        	   this.$('[data-header-link="'+ link +'"]').addClass('active');
            }
        },

        logout: function() {
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: App.settings.baseServiceUrl +'logout'
            }).done(function(/*data, textStatus, jqXHR*/) {
                window.location.replace('/login');
            });
        }
    });

});