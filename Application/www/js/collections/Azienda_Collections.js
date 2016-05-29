define(function(require) {

    var Backbone = require("backbone");
    var Azienda = require("models/Azienda");

    var Aziena_Collections = Backbone.Collection.extend({
        constructorName: "Azienda_Collections",
        model: Azienda

    });

    return Aziena_Collections;
});
