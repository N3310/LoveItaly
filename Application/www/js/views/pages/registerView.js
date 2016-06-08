define(function(require) {

    var Backbone = require("backbone");
    var ListCategory = require("models/ListCategory");
    var Utils = require("utils");
    var User = require("models/User");

    var registerView = Utils.Page.extend({

        constructorName: "registerView",

        model: ListCategory,

        initialize: function() {

            this.template = Utils.templates.register;

        },

        id: "registerView",
        className: "registerView",

        events: {
            "click #registrati": "registrati"
        },

        render: function() {

            var stored = JSON.parse(localStorage.getItem("cat"));
            $(this.el).html(this.template(stored));
            return this;
        },


        registrati: function(e) {

            el: $("#register-form");

            var self = this;

            // Prendo oggetti dal form HTML della registrazione
            var email = $(this.el).find("#email").val(),
                psw = $(this.el).find("#password").val(),
                nome = $(this.el).find("#nome").val(),
                cognome = $(this.el).find("#cognome").val();

            /*****************************************************
             * Popolo il synopsis da inviare con POST tramite
             * chiamata AJAX
             *****************************************************/

            var synopsis = '<?xml version="1.0" encoding="UTF-8"?> <prestashop xmlns:xlink="http://www.w3.org/1999/xlink"> <customer> <id_default_group></id_default_group> <id_lang format="isUnsignedId"></id_lang> <newsletter_date_add></newsletter_date_add> <ip_registration_newsletter></ip_registration_newsletter> <last_passwd_gen readOnly="true"></last_passwd_gen> <secure_key format="isMd5" readOnly="true"></secure_key> <deleted format="isBool"></deleted> <passwd required="true" maxSize="32" format="isPasswd">';
            synopsis += psw + '</passwd> <lastname required="true" maxSize="32" format="isName">';
            synopsis += cognome + '</lastname> <firstname required="true" maxSize="32" format="isName">';
            synopsis += nome + '</firstname> <email required="true" maxSize="128" format="isEmail">';
            synopsis += email + '</email> <id_gender format="isUnsignedId"></id_gender> <birthday format="isBirthDate"></birthday> <newsletter format="isBool"></newsletter> <optin format="isBool"></optin> <website format="isUrl"></website> <company format="isGenericName"></company> <siret format="isSiret"></siret> <ape format="isApe"></ape> <outstanding_allow_amount format="isFloat"></outstanding_allow_amount> <show_public_prices format="isBool"></show_public_prices> <id_risk format="isUnsignedInt"></id_risk> <max_payment_days format="isUnsignedInt"></max_payment_days> <active format="isBool"></active> <note maxSize="65000" format="isCleanHtml"></note> <is_guest format="isBool"></is_guest> <id_shop format="isUnsignedId"></id_shop> <id_shop_group format="isUnsignedId"></id_shop_group> <date_add format="isDate"></date_add> <date_upd format="isDate"></date_upd> <associations> <groups nodeType="groups" api="groups"> <groups> <id></id> </groups> </groups> </associations> </customer> </prestashop>';


            var autenticazione = function(xhr) {
                var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
                var token = 'Basic '.concat(key64);
                xhr.setRequestHeader('Authorization', token);
            }


            var chiamataAjax = function() {
                $.ajax({
                    url: 'http://192.168.56.101/loveitaly/api/customers/?id=1&schema=synopsis',
                    async: true,
                    data: synopsis,
                    type: "POST",
                    beforeSend: autenticazione,

                    success: function(result) {

                        //ora che è registrato lo metto in sessione
                        //e lo rimando alla home page

                        var utente = new User({
                            email: email,
                            psw: psw
                        });
                        console.log(utente);
                        utente.fetch({
                            success: function() {

                                $(".right").append('<li><a id="person-button" ><i class="material-icons">person</i></a></li>');

                                //avendo un client server locale, tra cui il server chiuso
                                //l'unica possibilità è effettuare una sessione "client"
                                //tutto in locale, una sorta di simulazione

                                localStorage.setItem("seressione", email);
                                Backbone.history.navigate("myview", {
                                    trigger: true
                                });
                            },
                            error: function() {}
                        })

                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        // qualcosa è andato storto => rimani li!

                    }
                })
            };

            chiamataAjax();


        }
    });

    return registerView;

});
