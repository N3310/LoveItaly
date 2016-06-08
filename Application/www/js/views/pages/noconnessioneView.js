define(function(require) {

    var Backbone = require("backbone");
    var ListCategory = require("models/ListCategory");
    var Utils = require("utils");
    var StructureView = require("views/StructureView");

    var noconnessioneView = Utils.Page.extend({

        constructorName: "noconnessioneView",

        model: ListCategory,

        initialize: function() {

            this.template = Utils.templates.noconnessione;

        },

        id: "noconnessioneView",
        className: "noconnessioneView",

        events: {
            "click #refresh": 'refresh'
        },

        render: function() {

            $(this.el).html(this.template());
            return this;
        },

        /*****************************************************
         * Funzione necessaria per riprovare il caricamento
         * delle impostazioni della connesione, nel caso in cui
         * uno l'avesse acceso ad applicazione aperta
         *****************************************************/
        refresh: function(e) {

            this.structureView = new StructureView();

            (this.structureView.render().el);
            this.structureView.trigger("inTheDOM");
        }


    });

    return noconnessioneView;

});
