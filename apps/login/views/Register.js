define(function(require, exports, module) {

    var RegisterTemplate = require('tpl!templates/register.jst'),
        RegisterModel = require('models/Register');

    // Register class - Item view
    return BaseClasses.ItemViewFadeIn.extend({
        tagName: 'div',
        className: 'row clearfix registration-form',
        template: RegisterTemplate,

        events: {
            'change': 'change',
            'click [data-registration-form-button="signup"]': 'validate'
        },

        initialize: function(/*options*/) {
            this.model = new RegisterModel();
            Backbone.Validation.bind(this);
        },

        change: function (e) {
            // Apply the change to the model
            var target = e.target;
            var change = {};
            var property = target.name;
            change[property] = target.value;

            // Setup the base validation model for the validation call backs.
            this.model.setSingleItemValidation(property);

            // Set validate: true to update validation with the model change
            this.model.set(property, target.value);
            this.model.set(change, {'validate': true});

            // Trigger the item validation.
            // Note: Form input error handling is performed within the model
            //       class with the Backbone.Validation callback listener
            var check = this.model.validateItem(property);
        },

        validate: function () {
            var self = this;

            //var check = this.model.isValid();
            var check = this.model.isModelValid();

            if (check === false) {
                return false; // Prevent form submit
            }

            this.login();

            return false; // Prevent form submit
        }

        // login: function() {
        //     $.ajax({
        //         type: 'post',
        //         contentType: 'application/json',
        //         dataType: 'json',
        //         data: JSON.stringify(this.model.attributes),
        //         url: '/services/v1/login'
        //     }).success(function(response/*, textStatus, jqXHR*/) {
        //         if (response.IsSuccess) {
        //             window.location.replace('/');
        //         } else {
        //             // TODO: Message: "This site is currently having technical issues. Please try again later."
        //         }
        //     }).error(function (jqXHR, textStatus, errorThrown) {
        //         if (jqXHR.status) {
        //             // TODO: Message: "Authentication failed, please check your username and password."
        //         } else {
        //             // TODO: Message: "This site is currently having technical issues. Please try again later."
        //         }
        //     });
        // }

    });

});