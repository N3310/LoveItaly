define(function(require) {

    var Backbone = require("backbone");
    var ListCategory = require("models/ListCategory");
    var Utils = require("utils");


    var contactView = Utils.Page.extend({

        constructorName: "contactView",

        model: ListCategory,

        initialize: function() {

            this.template = Utils.templates.contact;

        },

        id: "contactView",
        className: "contactView",

        events: {
            "click #botinput": "botinput"
        },

        render: function() {

            var stored = JSON.parse(localStorage.getItem("cat"));

            $(this.el).html(this.template(stored));
            return this;
        },

        botinput: function(e) {
            el: $("#contact-form");

            var self = this;

            /*****************************************************
             * Prendo gli elementi dal DOM della pag contatti
             *****************************************************/

            var domanda = $(this.el).find("#domanda").val(),
                textarea = $(this.el).find("#textarea1").val();

            var callback = function(result) {
                alert(result)
            };

            cordova.plugins.email.open({
                to: 'info@loveitaly.net',
                cc: '',
                bcc: [''],
                subject: domanda,
                body: textarea
            }, callback);
        },

        prodotto: function(e) {
            Backbone.history.navigate("listaprodotti", {
                trigger: true
            });
        }
    });

    return contactView;

});
