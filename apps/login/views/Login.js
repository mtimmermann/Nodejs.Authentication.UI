define(function(require, exports, module) {

    var LoginTemplate = require('tpl!templates/login.jst');

    // Login class - Item view
    return BaseClasses.ItemViewFadeIn.extend({
        template: LoginTemplate
    });

});