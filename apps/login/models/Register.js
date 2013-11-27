define(function(require, exports, module) {

    // Register class - model
    return BaseClasses.ModelFormValidation.extend({

        //urlRoot: 'services/v1/register',

        // initialize: function(attributes, options) { },

        defaults: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        },

        // http://www.verious.com/code/addyosmani/backbone.validation/
        validation: {
            email: [
                {
                    required: true,
                    msg: 'Please enter an email address'
                },
                {
                    pattern: 'email',
                    msg: 'Please enter a valid email'
                }
            ],
            username: {
                required: true,
                msg: 'Username is required'
            },
            password: {
                required: true,
                msg: 'Password is required'
            },
            confirmPassword: {
                required: true,
                msg: ' '
            }
        }

    });
});