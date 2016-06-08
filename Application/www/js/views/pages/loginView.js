define(function(require) {

    var Backbone = require("backbone");
    var User = require("models/User");
    var Utils = require("utils");
    var session = require("session");

    var loginView = Utils.Page.extend({


        constructorName: "loginView",

        model: User,

        initialize: function() {


            this.template = Utils.templates.login;

        },

        id: "loginView",
        className: "loginView",

        events: {
            "click #login": "login",
            "click #register": "register"
        },

        render: function() {

            var stored = JSON.parse(localStorage.getItem("cat"));
            $(this.el).html(this.template(stored));
            return this;
        },

        register: function(event) {

            Backbone.history.navigate("register", {
                trigger: true
            });
        },

        login: function(e) {

            el: $("#login-form");

            var self = this;

            /*****************************************************
             * Repreisco gli oggetti dal DOM
             *****************************************************/
            var username = $(this.el).find("#email").val(),
                psw = $(this.el).find("#password").val();

            /*****************************************************
             * Controllo ora tramite chiamata a server (fetch)
             * l'eventuale esistenza, nel caso esista lo mando
             * nella "myview", che corrisponde alla nostra schermata
             * principale altrimenti rimane li ritentando
             * l'autenticazione
             *****************************************************/

            var utente = new User({
                email: username,
                psw: psw
            });

            utente.fetch({

                success: function() {

                    $(".right").append('<li><a id="person-button" ><i class="material-icons">person</i></a></li>');

                    /*****************************************************
                     * Avendo un server locale, l'unico modo per ottenere
                     * una sessione vera e propria è in locale, usufruiamo
                     * quindi il localStorage, compatibile con tutti i
                     * mobile in commercio (wp, android, ios)
                     *****************************************************/

                    localStorage.setItem("sessione", username);
                    localStorage.setItem("idsess", (utente.attributes.customers)[0].id);
                    localStorage.setItem("keyorder", (utente.attributes.customers)[0].secure_key);
                    Backbone.history.navigate("myview", {
                        trigger: true
                    });

                    $("#person-button").click(function(e) {
                        e.preventDefault();
                        $('#modal2').openModal();
                    });

                },
                error: function() {}

            })

        }

    });

    return loginView;

});
