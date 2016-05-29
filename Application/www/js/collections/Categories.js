define(function(require) {

    var autenticazione = function(xhr) {
        var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
        var token = 'Basic '.concat(key64);
        xhr.setRequestHeader('Authorization', token);
    }

    var Backbone = require("backbone");
    var ListCategory = require("models/ListCategory");

    var Categories = Backbone.Collection.extend({
        constructorName: "Categories",
        model: ListCategory,


        url: 'http://192.168.56.101/loveitaly/api/categories/?io_format=JSON&display=full',

        parse: function(data) {
            return data.categories;
        },

        sync: function(method, collection, options) {
            options = options || {};
            options.beforeSend = autenticazione;
            return Backbone.Collection.prototype.sync.apply(this, arguments);
        },

    });

    return Categories;
});
