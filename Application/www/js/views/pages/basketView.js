define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");

    var basketView = Utils.Page.extend({

        constructorName: "basketView",


        initialize: function() {
            this.template = Utils.templates.basket;
        },

        id: "basket",
        className: "basket",

        events: {
            "click #listbymanu": "listbymanu",
            "click #cartleft-btn": "checkout",
        },

        render: function() {

            var that = this.template(JSON.parse(localStorage["Carrello"]));
            return that;

        },

        listbymanu: function(e) {
            Backbone.history.navigate("listbymanu", {
                trigger: true
            });
        },
        checkout: function(e) {

            Backbone.history.navigate("checkout", {
                trigger: true
            });
        },
    });

    return basketView;

});
