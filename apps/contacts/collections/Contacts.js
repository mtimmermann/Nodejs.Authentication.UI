define(function(require, exports, module) {

	var Model = require('models/Contact');

    //return Backbone.Collection.extend({
    // Paginated contacts collection
    //return Backbone.Paginator.requestPager.extend({
    return Backbone.Paginator.clientPager.extend({

    	//url: 'services/v1/contacts',

		model: Model,

		//initialize: function(models, options) {},

        paginator_core: {
            type: 'GET',
            dataType: 'json',
            url: 'services/v1/contacts'
        },

        paginator_ui: {
            // The lowest page index your API allows to be accessed
            firstPage: 1,

            // Which page should the paginator start from
            // (also, the actual page the paginator is on)
            currentPage: 1,

            // How many items per page should be shown
            perPage: 8,

            // A default number of total pages to query in case the API or
            // service you are using does not support providing the total
            // number of pages for us.
            // 10 as a default in case your service doesn't return the total
            totalPages: 10,

            // The total number of pages to be shown as a pagination
            // list is calculated by (pagesInRange * 2) + 1.
            pagesInRange: 4
        },

        server_api: {

            'page': function() { return this.currentPage; },
            'pageSize': function() { return this.perPage; }

            // the query field in the request
            //'$filter': 'substringof(\'america\',Name)',

            // number of items to return per request/page
            //'$top': function() { return this.perPage },

            // how many results the request should skip ahead to
            // customize as needed. For the Netflix API, skipping ahead based on
            // page * number of results per page was necessary.
            //'$skip': function() { return this.currentPage * this.perPage },

            // field to sort by
            //'$orderby': 'ReleaseYear',

            // what format would you like to request results in?
            //'$format': 'json',

            // custom parameters
            //'$inlinecount': 'allpages',
            //'$callback': 'callback'
        },

		getCollection: function() {
            // Ensure Backbone pagination origModels is defined, set reset to true
            this.deferred = this.fetch({reset: true})
                .error(function(jqXHR/*, textStatus, errorThrown*/) {
                    if (jqXHR.status === 403) {
                        window.location.replace('/login');
                        App.Notifications.trigger('Logout', null);
                    }
                });
		},

        parse: function(response) {
            if (response && response.data) {
                this.totalPages = Math.ceil(response.totalRecords / this.perPage);
                return response.data;
            }
            this.totalPages = 0;
            return [];
        }

        // _generateStubbedData: function() {
        //     this.deferred = new $.Deferred();
        //     this.reset(this._stubbedData());
        //     this.deferred.resolve();
        // },

        // _stubbedData: function() {
        // 	return
        //         [
        //           {
        //             "lastName": "Or4Uj9qMkV",
        //             "firstName": "Zbsemv",
        //             "city": "OgLteavE",
        //             "region": "ftYBSnl9",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "HuDHjg3gvW",
        //             "firstName": "67sWuO",
        //             "city": "NWPHgqtd",
        //             "region": "SSnA2moO",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "SnE8ixol2i",
        //             "firstName": "fB7pIb",
        //             "city": "bjGphqiX",
        //             "region": "JYpIjfXu",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "BhqMVUSIuS",
        //             "firstName": "FFxtB5",
        //             "city": "OUDHZ3tm",
        //             "region": "lcxwIlhg",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "gIAXHtejT6",
        //             "firstName": "LOslRx",
        //             "city": "zxmA8bqx",
        //             "region": "xtCtmjzj",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "1nvaQUnke8",
        //             "firstName": "sixJ1w",
        //             "city": "8360cT1C",
        //             "region": "FIEQceP4",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "5XU64Kfcdh",
        //             "firstName": "zDBp7I",
        //             "city": "yGCg32h9",
        //             "region": "XYBE1PqX",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "s3D80VxjNH",
        //             "firstName": "hxHksW",
        //             "city": "Ei0Czy5Q",
        //             "region": "e9myhrOM",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "gvVSYNXv1R",
        //             "firstName": "ZJhdmB",
        //             "city": "zbPtYW4z",
        //             "region": "G8BbdJqB",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "oI8vIxIvfo",
        //             "firstName": "Efd61h",
        //             "city": "qCIu11pq",
        //             "region": "rALRlCrB",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "QNwslxFyVV",
        //             "firstName": "cMV7Nq",
        //             "city": "FDjFPc83",
        //             "region": "rBoq0uZw",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "mMlsQNEtLV",
        //             "firstName": "GIq22p",
        //             "city": "w0VAf7DF",
        //             "region": "yTFH0sMh",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "u9Sg6juXei",
        //             "firstName": "dSAGb0",
        //             "city": "QJdtmhMi",
        //             "region": "CjhFPTiN",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "fXYGIAZI8j",
        //             "firstName": "zMc0rv",
        //             "city": "44wUQb6B",
        //             "region": "pH77JppS",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "9UHBlfQmSP",
        //             "firstName": "QQ8gRk",
        //             "city": "Yj2vqoTi",
        //             "region": "XeMlS4b8",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "436kN4lUjb",
        //             "firstName": "8liE0Q",
        //             "city": "RGHYWfMN",
        //             "region": "TnpNZMFk",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "Mg9gN69hTq",
        //             "firstName": "gJXN6e",
        //             "city": "G1p7PLYc",
        //             "region": "QavofdDd",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "W7aM3NaCm2",
        //             "firstName": "FUa0TK",
        //             "city": "DEdVH6Li",
        //             "region": "v7CzOP4Q",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "5huuQCyAf5",
        //             "firstName": "HR03Om",
        //             "city": "eD8xEJIX",
        //             "region": "Yy9imqkm",
        //             "country": "USA"
        //           },
        //           {
        //             "lastName": "4Xa3AITSsp",
        //             "firstName": "CszwMD",
        //             "city": "j6Gp5N5M",
        //             "region": "ycmCVQWZ",
        //             "country": "USA"
        //           }
        //         ];
        // }

    });
});