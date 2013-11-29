define(function(require, exports, module) {

	var ContactListItemTemplate = require('tpl!templates/main_list/contact_list_item.jst');

    // ContactListItem class - Item view
    //return Backbone.Marionette.ItemView.extend({
    return BaseClasses.ItemViewFadeIn.extend({
        tagName: 'li',
        className: 'thumbnail-container',
        template: ContactListItemTemplate
    });

});