define(function(require) {

    var Backbone = require("backbone");
    var $ = require("jquery");


    var autenticazione = function(xhr) {
        var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
        var token = 'Basic '.concat(key64);
        xhr.setRequestHeader('Authorization', token);
    }

    var Products_homepage = Backbone.Model.extend({

        constructorName: "Products_homepage",

        initialize: function(options) {
            this.id = options.id;
        },

        url: function() {
            var url = 'http://192.168.56.101/loveitaly/api/products/?io_format=JSON&sort=';
            url += this.id;
            url += '&display=full&limit=5';
            return url;
        },

        parse: function(response) {

            return response.products;
        },
        sync: function(method, collection, options) {
            options = options || {};
            options.beforeSend = autenticazione;
            return Backbone.Model.prototype.sync.apply(this, arguments);
        }
    });

    return Products_homepage;
});
