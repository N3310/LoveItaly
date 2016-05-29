define(function(require) {

    var Backbone = require("backbone");
    var $ = require("jquery");


    var autenticazione = function(xhr) {
        var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
        var token = 'Basic '.concat(key64);
        xhr.setRequestHeader('Authorization', token);
    }

    var Imageproduct = Backbone.Model.extend({

        constructorName: "Imageproduct",


        initialize: function(options) {
            this.idprod = options.idprod;
            this.idimg = options.idimg;
        },

        url: function() {
            var url = 'http://192.168.56.101/loveitaly/api/images/products/';
            url += this.idprod;
            url += '/';
            url += this.idimg;
            return url;
        },

      parse: function(response) {
            return response;
        },

        sync: function(method, collection, options) {
            options = options || {};
            options.beforeSend = autenticazione;
            return Backbone.Model.prototype.sync.apply(this, arguments);
        }
    });

    return Imageproduct;
});
