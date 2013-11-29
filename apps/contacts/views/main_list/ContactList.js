define(function(require, exports, module) {

	var ContactListTemplate = require('tpl!templates/main_list/contact_list.jst'),
		//Contacts = require('collections/Contacts'),
		ContactListItemView = require('views/main_list/ContactListItem');

    // ContactList class - Composite view
    return Backbone.Marionette.CompositeView.extend({
        tagName: 'ul',
        className: 'thumbnails',
        template: ContactListTemplate,
        itemView: ContactListItemView,
        //collection: Contacts,

        initialize: function(options) {
            options = options || {};
            if (!options.collection) {
                throw (new Error('ContactList View: collection option is required'));
            }
        }

    });

});