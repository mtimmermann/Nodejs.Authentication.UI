define(function(require, exports, module) {

	var ContactListLayout = require('tpl!templates/main_list/contact_list_layout.jst');

    // ContactListLayout class - layout view
    return Backbone.Marionette.Layout.extend({

        template: ContactListLayout,

        regions: {
            paginatorTop: '#paginator-top',
            contactSearch: '#contact-search',
            //contactList: BaseClasses.RegionFadeIn.extend({ el: '#contact-list' }),
            contactList: '#contact-list',
            paginatorBottom: '#paginator-bottom'
        }
    });

});