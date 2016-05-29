define(function(require) {

    var Backbone = require("backbone");
    var $ = require("jquery");


    var autenticazione = function(xhr) {
        var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
        var token = 'Basic '.concat(key64);
        xhr.setRequestHeader('Authorization', token);
    }

    var ListAz = Backbone.Model.extend({

        constructorName: "ListAz",

        initialize: function() {

        },
        url: 'http://192.168.56.101/loveitaly/api/manufacturers/?io_format=JSON&display=full',

        parse: function(data) {
            return data.manufacturers;
        },
        sync: function(method, collection, options) {
            options = options || {};
            options.beforeSend = autenticazione;
            return Backbone.Model.prototype.sync.apply(this, arguments);
        }
    });

    return ListAz;
});
