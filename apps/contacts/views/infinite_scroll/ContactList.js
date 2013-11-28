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

        // http://backbonetutorials.com/infinite-scrolling/

        events: {
            'click [data-inf-scroll-add="button"]': '_getNext'
            //'scroll': 'checkScroll'
        },

        initialize: function(options) {
            options = options || {};
            if (!options.collection) {
                throw (new Error('ContactList View: collection option is required'));
            }

            this._isLoading = false; // True if currently requesting a page

            var self = this;
            this._scrollListener = function(evt) {
                self._checkScroll();
            };
            window.addEventListener('scroll', this._scrollListener, false);

        },

        _checkScroll: function() {
            console.log('checkScroll');
            if (this.collection.currentPage === this.collection.totalPages) {
                // Remove the scroll listener
                window.removeEventListener('scroll', this._scrollListener, false);
                return; // Disabled
            }

            //var triggerPoint = 100; // 100px from the bottom
            var triggerPoint = 20;

            //http://stackoverflow.com/questions/3898130/how-to-check-if-a-user-has-scrolled-to-the-bottom
            if (!this._isLoading &&
                ($(window).scrollTop() + $(window).height() > $(document).height() - triggerPoint)) {
                    this._getNext();
            }
        },

        _getNext: function() {
            var self = this;

            // Save the current collection list perform page.
            var currentList = _(this.collection.models).clone();
            this._isLoading = true;
            this.collection.nextPage({});
            this.collection.getCollection();

            // Reset the list with currentList + newList
            $.when(this.collection.deferred.promise()).done(function () {
                var newList = _(self.collection.models).clone();
                _.each(newList, function(model) {
                    currentList.push(model);
                });
                self.collection.reset(currentList);
                self._isLoading = false;
            });
        }

    });

});