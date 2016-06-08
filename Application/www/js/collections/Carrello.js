define(function(require) {

    var Backbone = require("backbone");
    var Products = require("models/Products");

    var Carrello = Backbone.Collection.extend({
        constructorName: "Carrello",
        model: Products
    });

    return Carrello;
});
