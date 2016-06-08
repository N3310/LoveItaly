define(function(require) {

    var Backbone = require("backbone");
    var ListCategory = require("models/ListCategory");
    var Utils = require("utils");

    var faqView = Utils.Page.extend({

        constructorName: "faqView",

        model: ListCategory,

        initialize: function() {

            this.template = Utils.templates.faq;

        },

        id: "faqView",
        className: "faqView",

        events: {
            "tap #home": "home"
        },

        render: function() {

            var stored = JSON.parse(localStorage.getItem("cat"));
          
            $(this.el).html(this.template(stored));
            return this;
        },

        home: function(e) {
            Backbone.history.navigate("myview", {
                trigger: true
            });
        },
        prodotto: function(e) {
            Backbone.history.navigate("listaprodotti", {
                trigger: true
            });
        }
    });

    return faqView;

});
