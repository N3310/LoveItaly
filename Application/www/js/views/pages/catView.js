define(function(require) {

    var Backbone = require("backbone");
    var ListCategory = require("models/ListCategory");
    var Utils = require("utils");

    var catView = Utils.Page.extend({

        constructorName: "catView",

        model: ListCategory,

        initialize: function() {

            this.template = Utils.templates.catView;

        },

        id: "catView",
        className: "catView",

        events: {
            "click #listaprod": "listaprod"
        },

        render: function() {

            var contenitore = new Array();

            /*****************************************************
             * Uso array del localStorage per avere un accesso
             * piu veloce rispetto ad una chiamata AJAX
             *****************************************************/

            var stored = JSON.parse(localStorage.getItem("cat"));


            var immagini = new Array("", "", "img/img_cat/verdura.jpg", "img/img_cat/frutta.jpg", "img/img_cat/olio.jpg", "img/img_cat/vino.png", "img/img_cat/forno.jpg", "img/img_cat/miele.jpg", "img/img_cat/vino-rosso.jpg", "img/img_cat/vino-rosato.jpeg", "img/img_cat/vino-bianco.jpg", "img/img_cat/pane.png", "img/img_cat/dolci.jpg", "img/img_cat/pizza.jpg", "img/img_cat/sottolio.jpg", "img/img_cat/confetture.jpg", "img/img_cat/formaggio.jpg", "", "");

            for (var i = 0; i < 18; i++) {
                var categoria = {
                    id: stored[i].id,
                    img: immagini[i],
                    nome: stored[i].name,
                    meta_title: stored[i].meta_title
                }
                contenitore.push(categoria);
            }

            /*****************************************************
             * Rimuovo e pulisco ciò che ho ottenuto da Prestashop
             *****************************************************/
            contenitore.splice(0, 2);
            contenitore.splice(15, 2);

            $(this.el).html(this.template(contenitore));
            return this;
        },

        home: function(e) {
            Backbone.history.navigate("myview", {
                trigger: true
            });
        },

        listaprod: function(e) {

            e.preventDefault();

            var datocategoria = $(e.currentTarget).attr("data-cat");

            localStorage.setItem("datocategoria", datocategoria);

            Backbone.history.navigate("listaprod", {
                trigger: true
            });
        },

        prodotto: function(e) {
            Backbone.history.navigate("listaprodotti", {
                trigger: true
            });
        }
    });

    return catView;

});
