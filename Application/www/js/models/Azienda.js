define(function(require) {

    var Backbone = require("backbone");
    var $ = require("jquery");


    var autenticazione = function(xhr) {
        var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
        var token = 'Basic '.concat(key64);
        xhr.setRequestHeader('Authorization', token);
    }

    var Azienda = Backbone.Model.extend({

        constructorName: "Azienda",

        initialize: function(options) {
            this.id = options.id;
        },

        url: function() {
            var url = 'http://192.168.56.101/loveitaly/api/manufacturers/';
            url += this.id;
            url += '?io_format=JSON';
            return url;
        },

        parse: function(response) {

            return response.manufacturer;
        },
        sync: function(method, collection, options) {
            options = options || {};
            options.beforeSend = autenticazione;
            return Backbone.Model.prototype.sync.apply(this, arguments);
        }
    });

    return Azienda;
});
