define(function(require, exports, module) {

	var App = require('App'),
		HeaderView = require('views/Header'),
		ContactListLayout = require('views/ContactListLayout'),
		ContactListView = require('views/ContactList'),
        ContactDetailsView = require('views/ContactDetails'),
        ContactEditView = require('views/ContactEdit'),
		PaginatorView = require('views/Paginator'),
        SearchInputView = require('views/contacts_search/SearchInput'),
		Contacts = require('collections/Contacts'),
        Contact = require('models/Contact'),
		AboutView = require('views/About');

    return Backbone.Marionette.Controller.extend({

        initialize: function (options) {
        	this._headerView = new HeaderView();
            App.headerRegion.show(this._headerView);

            // Event subscriptions
            // Prevent UI shifting on contact paging operations
            App.Notifications.on('Paginator.onPrePage', this._onPrePage, this);
            App.Notifications.on('Paginator.onDonePage', this._onDonePage, this);
        },

        // AppRouter appRoutes

        index: function () {
        	this._headerView.setActiveLink('index');

            this._initContactCollection();

            //$.when.apply(null, [contactsCollection.deferred.promise()]).done(function () {
            $.when(App.collections.contacts.deferred.promise()).done(function () {
        		var contactListLayout = new ContactListLayout();
        		App.mainRegion.show(contactListLayout);

                // Show Contact List region
                contactListLayout.contactList.show(
					new ContactListView({'collection': App.collections.contacts}));

                // Show pagination regions
                contactListLayout.paginatorTop.show(
                    new PaginatorView(App.collections.contacts));
                contactListLayout.paginatorBottom.show(
                    new PaginatorView(App.collections.contacts));

                // Show contact search input region
                contactListLayout.contactSearch.show(new SearchInputView());
        	});
        },

        contactDetails: function(contactID) {
            this._headerView.setActiveLink('none');

            // Try finding model in current paged collection, otherwise fetch the model.
            var contact = null;
            var deferred = new $.Deferred();
            if (App.collections.contacts) {
                contact = _.findWhere(App.collections.contacts.models, {'id': contactID});
                if (contact) {
                    deferred.resolve();
                }
            }
            if (deferred.state() != 'resolved') {
                var tmp = '';
                contact = new Contact({'id': contactID});
                contact.fetch().done(function() {
                    deferred.resolve();
                }).fail(function(jqXHR/*, textStatus, errorThrown*/) {
                    if (jqXHR.status == 404) {
                        // TODO: 404 - Bootstrap alert message or view
                    } else {
                        // TODO: General server - Bootstrap alert message or view
                    } 
                });
            }
            $.when(deferred.promise()).done(function () {
                App.mainRegion.show(new ContactDetailsView({'model': contact}));
            });
        },

        contactEdit: function(contactID) {
            this._headerView.setActiveLink('none');
            var contact = new Contact({'id': contactID});
            var deferred = contact.fetch();
            $.when(deferred.promise()).done(function () {
                App.mainRegion.show(new ContactEditView({model: contact}));
            }).fail(function(jqXHR/*, textStatus, errorThrown*/) {
                if (jqXHR.status == 404) {
                    // TODO: 404 - Bootstrap alert message or view
                } else {
                    // TODO: General server - Bootstrap alert message or view
                } 
            });
        },

        contactAdd: function() {
            this._headerView.setActiveLink('add');
            var contact = new Contact();
            App.mainRegion.show(new ContactEditView({model: contact}));
        },

        about: function() {
        	this._headerView.setActiveLink('about');
        	App.mainRegion.show(new AboutView());
        },

        _initContactCollection: function() {
            App.collections.contacts = new Contacts();
            App.collections.contacts.getCollection();
        },

        // Prevent UI shifting on contact paging operations
        _onPrePage: function(/*message*/) {
            //var height = App.mainRegion.currentView.contactList.$el.height();
            var height = App.mainRegion.currentView.contactList.$el.parent().height();
            App.mainRegion.currentView.contactList.$el.css('height', height);
        },
        _onDonePage: function(/*message*/) {
            $.when(App.collections.contacts.deferred.promise()).done(function () {
                setTimeout(function() {
                    App.mainRegion.currentView.contactList.$el.css('height', '');
                }, 500);
            });
        },
    });

});