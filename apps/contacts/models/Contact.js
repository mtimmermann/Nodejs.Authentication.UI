define(function(require, exports, module) {

    // Contact class - model
    return BaseClasses.ModelFormValidation.extend({

        urlRoot: 'services/v1/contacts',

        // initialize: function(attributes, options) { },

        parse: function(data) {
            // Temporary, must fix service and ensure id is returned
            data.id = data._id;
            return data;
        },

        defaults: {
            id: null,
            firstName: '',
            lastName: '',
            email1: '',
            email1_note: '',
            phone1: '',
            phone1_note: '',
            city: '',
            region: 'Colorado',
            country: 'USA',
            picture: null,
            description: ''
        },

        // http://www.verious.com/code/addyosmani/backbone.validation/
        validation: {
            firstName: {
                required: true,
                msg: 'First Name is required'
            },
            lastName: {
                required: true,
                msg: 'Last Name is required'
            },
            email1: [
                {
                    required: true,
                    msg: 'Please enter an email address'
                },
                {
                    pattern: 'email',
                    msg: 'Please enter a valid email'
                }
            ]
        }

    });
});