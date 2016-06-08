define(function(require) {

    var Backbone = require("backbone");
    var ListCategory = require("models/ListCategory");
    var Utils = require("utils");

    var aziendeView = Utils.Page.extend({

        constructorName: "aziendeView",

        model: ListCategory,

        initialize: function() {

            this.template = Utils.templates.aziende;

        },

        id: "aziendeView",
        className: "aziendeView",

        events: {
            "click #dettaglio_azienda": "dettaglio_azienda"
        },

        render: function() {

            stored = JSON.parse(localStorage.getItem("lista_azienda"));

            $(this.el).html(this.template(stored));
            return this;
        },

        dettaglio_azienda: function(e) {

            e.preventDefault();

            var datoazienda = $(e.currentTarget).attr("data-az");

            localStorage.setItem("datoazienda", datoazienda);

            Backbone.history.navigate("dettaglio_azienda", {
                trigger: true
            });
        }
    });

    return aziendeView;

});
