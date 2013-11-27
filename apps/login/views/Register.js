define(function(require, exports, module) {

    var RegisterTemplate = require('tpl!templates/register.jst');

    // Register class - Item view
    return BaseClasses.ItemViewFadeIn.extend({
        template: RegisterTemplate
    });

});