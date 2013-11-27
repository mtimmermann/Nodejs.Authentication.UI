/* global define */
/* global _ */
/* global Backbone */

define(function(require, exports, module) {

    var Login = Backbone.Model.extend({
        url: '/services/Login',
        validation:{
            EmailID: [{
                required: true,
                msg: 'Please provide your email'
            },{
                pattern: 'email',
                msg: 'Are you sure that\'s your email address? It doesn\'t look right to us.'
            }],
            Password:{
                required: true
            }
        },
        save: function() {
            // overwrite the save to work with the current server
            // change me with nginx
            return $.ajax({
                type: 'post',
                url:  this.url,
                data: _.pick(this.attributes, 'EmailID', 'Password')
            });
        }
    });
    return Login;
    
});
