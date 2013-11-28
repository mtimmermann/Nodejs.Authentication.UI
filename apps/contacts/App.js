define(function(require, exports, module) {

    var LocalAppSettings = require('config/Settings');

	var App = new Backbone.Marionette.Application();

    // function isMobile() {
    //     var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    //     return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
    // }
    //App.mobile = isMobile();

	App.addRegions({
		headerRegion: "#header-region",
		mainRegion: "#main-region"
		// dialogRegion: Marionette.Region.Dialog.extend({
		// 	el: "#dialog-region"
		// })
	});

    // App settings, combine global and local settings.
    App.settings = _.extend(AppSettings, LocalAppSettings);

    // If true app is used w/ multiple users and uploaded
    // pics need to be stored in separated sub-directories.
    if (App.settings.getUserInfo) {
        $.ajax({
            url: App.settings.baseServiceUrl + 'user',
            type: 'GET',
            dataType: 'json',
            async: false
        }).done(function(data, textStatus, jqXHR) {
            App.settings.setUserPicsDirectory(data.id);
            App.settings.userInfo = _.extend({}, data);
        }).fail(function(/*jqXHR, textStatus, errorThrown*/) {
            // Do nothing, fail gracefully and display
            // site without contact pictures.
        });
    }

	App.collections = {
		contacts: null
	};

    App.Notifications = {};
    _.extend(App.Notifications, Backbone.Events);

    App.addInitializer(function () {
        Backbone.history.start();
    });

	// BaseApp.on("initialize:after", function() {
	// 	if(Backbone.history) {
	// 		Backbone.history.start();
	// 	}
	// });

    // App.appRouter = new AppRouter({
    //     controller: new AppController()
    // });


	return App
});