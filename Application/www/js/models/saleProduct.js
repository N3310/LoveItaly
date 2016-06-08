define(function(require) {

    var Backbone = require("backbone");
    var $ = require("jquery");
    var productHomepage= require("models/productHomepage");


    var autenticazione = function(xhr) {
        var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
        var token = 'Basic '.concat(key64);
        xhr.setRequestHeader('Authorization', token);
    }

    var saleProduct = productHomepage.extend({

      constructorName: "saleProduct",

      initialize: function(options) {

      },

      url: function() {


        var url = 'http://192.168.56.101/loveitaly/api/products/?io_format=JSON&sort=';
        url += "on_sale_DESC";
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


    return saleProduct;
});
