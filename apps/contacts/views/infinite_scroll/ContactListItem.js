define(function(require, exports, module) {

    var ContactListItemTemplate = require('tpl!templates/infinite_scroll/contact_list_item.jst');

    // ContactListItem class - Item view
    return BaseClasses.ItemViewFadeIn.extend({
        //tagName: 'li',
        //className: 'thumbnail-container',
        template: ContactListItemTemplate
    });

});