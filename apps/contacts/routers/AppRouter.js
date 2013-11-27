define(function(require, exports, module) {

   return Backbone.Marionette.AppRouter.extend({
       //"index" must be a method in AppRouter's controller
       appRoutes: {
           '': 'index',
           'contacts/:id': 'contactDetails',
           'contacts/edit/:id': 'contactEdit',
           'add': 'contactAdd',
           'about': 'about'
       }
   });

});