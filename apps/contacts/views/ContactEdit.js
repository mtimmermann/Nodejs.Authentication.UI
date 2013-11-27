define(function(require, exports, module) {

	var ContactEditTemplate = require('tpl!templates/contact_edit.jst');

	// ContactDetails class - Item view
    return BaseClasses.ItemViewFadeIn.extend({

        tagName: 'div',
        className: 'contact-edit',
    	template: ContactEditTemplate,

    	events: {
            'change': 'change',
    		'click [data-contact-edit-button="save"]': 'validate',
    		'click [data-contact-edit-button="delete"]': 'delete',
            'drop #picture'     : 'dropHandler',
            'dragover #picture' : 'dragHandler', // Must call event.preventDefault() for drop event listener to work
            'drop div.well'     : 'dropHandler',
            'dragover div.well' : 'dragHandler' // Must call event.preventDefault() for drop event listener to work
    	},

        pictureFile: null,

    	initialize: function(options) {
            options = options || {};
            if (!options.model) {
                throw (new Error('ContactEdit View: model option is required'));
            }
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
                //contacts.utils.displayValidationErrors(check.messages);
                return false; // Prevent form submit
            }
            // Upload picture file if a new file was dropped in the drop area
            if (this.pictureFile) {
                this.model.set('picture', this.pictureFile.name);
                this.uploadFile(this.pictureFile,
                    function () {
                        self.save();
                    }
                );
            } else {
                this.save();
            }
            return false; // Prevent form submit
        },

        save: function() {
            var self = this;
            this.model.save(null, {
                success: function (model) {
                    // self.render();
                    // contacts.appRouter.navigate('contacts/edit/' + model.id, false);
                    // contacts.utils.showAlert('Success!', 'Contact saved successfully', 'alert-success');
                },
                error: function () {
                    // TODO:
                    //contacts.utils.showAlert('Error', 'An error occurred while trying to save this item', 'alert-error');
                }
            });
        },

        delete: function () {
            this.model.destroy({
                success: function () {
                    // TODO: Display bootstrap floating alert
                    alert('Contact deleted successfully');
                    App.appRouter.navigate('', true);
                },
                error: function () {
                    // TODO:
                    // ('Error', 'An error occurred while trying to delete this item', 'alert-error');
                }
            });

        	return false; // Prevent form submit
        },

        dragHandler: function (event) {
            event.preventDefault();
        },

        dropHandler: function (event) {
            event.stopPropagation();
            event.preventDefault();
            var e = event.originalEvent;
            e.dataTransfer.dropEffect = 'copy';
            this.pictureFile = e.dataTransfer.files[0];

            // Read the image file from the local file system and display it in the img tag
            var reader = new FileReader();
            reader.onloadend = function () {
                $('#picture').attr('src', reader.result);
            };
            reader.readAsDataURL(this.pictureFile);
        },

        uploadFile: function (file, callbackSuccess) {
            var self = this;
            var data = new FormData();
            data.append('file', file);
            $.ajax({
                url: 'services/v1/uploader',
                type: 'POST',
                data: data,
                processData: false,
                cache: false,
                contentType: false
            //}).done(function () {
            }).success(function (/*data, textStatus, jqXHR*/) {
                //console.log(file.name + " uploaded successfully");
                callbackSuccess();
            }).error(function (/*jqXHR, textStatus, errorThrown*/) {
                // TODO:
                //self.showAlert('Error!', 'An error occurred while uploading ' + file.name, 'alert-error');
            });
        }

    });

});