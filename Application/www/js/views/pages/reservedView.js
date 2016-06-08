define(function(require) {

    var Backbone = require("backbone");
    var Customer = require("models/Customer");
    var Utils = require("utils");

    var reservedView = Utils.Page.extend({

        constructorName: "reservedView",


        model: Customer,

        initialize: function() {
            this.template = Utils.templates.reserved;
        },

        id: "reservedView",
        className: "reservedView",

        events: {
            "tap #home": "home",
            "tap #dettaglio": "detail"
        },

        render: function() {

            var email_utente = localStorage.getItem("sessione");
            var utente = new Customer({
                id: email_utente
            });
            console.log(utente);
            var that = this;
            utente.fetch({
                success: function() {


                    var autenticazione = function(xhr) {
                        var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
                        var token = 'Basic '.concat(key64);
                        xhr.setRequestHeader('Authorization', token);
                    }

                    var chiamataAjax = function() {
                        $.ajax({
                            url: 'http://192.168.56.101/loveitaly/api/orders/?io_format=JSON&display=full&filter[id_customer]='+ localStorage.getItem("idsess"),
                            async: true,
                            type: "GET",
                            dataType: 'json',
                            beforeSend: autenticazione,

                            success: function(result) {
                                utente.ordini= result.orders;
                                console.log(utente.toJSON());
                                $(that.el).html(that.template(utente));
                                return that;
                              },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                console.log('Errore chiamata ajax!' +
                                    '\nReponseText: ' + XMLHttpRequest.responseText +
                                    '\nStatus: ' + textStatus +
                                    '\nError: ' + errorThrown);
                            }
                        })
                    }
                    chiamataAjax();

                },
                error: function() {}
            })

        }


    });

    return reservedView;

});
