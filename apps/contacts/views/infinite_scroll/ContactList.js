define(function(require, exports, module) {

    var ContactListTemplate = require('tpl!templates/infinite_scroll/contact_list.jst'),
        //Contacts = require('collections/Contacts'),
        ContactListItemView = require('views/infinite_scroll/ContactListItem');

    // ContactList class - Composite view
    return Backbone.Marionette.CompositeView.extend({
        //tagName: 'ul',
        //className: 'thumbnails',
        template: ContactListTemplate,
        itemView: ContactListItemView,
        //collection: Contacts,

        events: {
            'click [data-inf-scroll-add="button"]': 'getNext'
        },

        initialize: function(options) {
            options = options || {};
            if (!options.collection) {
                throw (new Error('ContactList View: collection option is required'));
            }
        },

        getNext: function() {
            var self = this;

            // Save the current collection list perform page.
            var currentList = _(this.collection.models).clone();
            this.collection.nextPage({});
            this.collection.getCollection();

            // Reset the list with currentList + newList
            $.when(this.collection.deferred.promise()).done(function () {
                var newList = _(self.collection.models).clone();
                _.each(newList, function(model) {
                    currentList.push(model);
                });
                self.collection.reset(currentList);
            });
        }

    });

});