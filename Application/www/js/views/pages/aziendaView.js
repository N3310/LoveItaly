define(function(require) {

    var Backbone = require("backbone");
    var Azienda = require("models/Azienda");
    var Utils = require("utils");
    var ListProductByManufacterView = require("views/pages/ListProductByManufacterView");

    var aziendaView = Utils.Page.extend({

        constructorName: "aziendaView",

        model: Azienda,

        initialize: function() {


            this.template = Utils.templates.dettaglio_azienda;
        },

        id: "dettaglio_azienda",
        className: "aziendaView",

        events: {
            "click #listbymanu": "listbymanu"
        },

        render: function() {


            var temp = localStorage.getItem("datoazienda");
            var model = new Azienda({
                id: temp
            });

            var that = this;
            model.fetch({
                success: function() {

                    var temptext = model.get('short_description');

                    /*****************************************************
                     * Questa funzione serve ad eliminare i tag e ottenere
                     * semplice testo puro. Ci serviamo quindi di una
                     * funzione jQuery
                     *****************************************************/
                    model.set("short_description", $(temptext).text());
                    $(that.el).html(that.template(model.toJSON()));
                    return that;

                }
            });


        },

        listbymanu: function(e) {
            Backbone.history.navigate("listbymanu", {
                trigger: true
            });
        }
    });

    return aziendaView;

});
