define(function(require) {

    var Backbone = require("backbone");
    var ListCategory = require("models/ListCategory");
    var Utils = require("utils");

    var checkoutView = Utils.Page.extend({

        constructorName: "checkoutView",

        model: ListCategory,

        initialize: function() {
            this.template = Utils.templates.checkout;
        },

        id: "checkoutView",
        className: "checkoutView",

        events: {
            "click #ordina": "ordina",
            "click #svuota": "svuota",
            "click #cartleft-btn": "checkout"
        },

        render: function() {

            var stored = JSON.parse(localStorage.getItem("cat"));
            $(this.el).html(this.template(stored));
            return this;
        },

        checkout: function(e) {

            var utente = localStorage.getItem("sessione");
            if (utente === null) {
                Backbone.history.navigate("login", {
                    trigger: true
                });
            } else {
                Backbone.history.navigate("checkout", {
                    trigger: true
                });
            }
        },


        svuota: function(e) {

            var Carrello = JSON.parse(localStorage["Carrello"]);
            Carrello = [];
            localStorage["Carrello"] = JSON.stringify(Carrello);
            Backbone.history.navigate("basket", {
                trigger: true
            });
        },

        ordina: function(e) {

            el: $("#checkout-form");

            var arrayordini = JSON.parse(localStorage["Carrello"]);;
            var self = this;

            /*****************************************************
             * Prendo gli elementi dal DOM
             *****************************************************/

            var email = localStorage.getItem("sessione"),
                nome = $(this.el).find("#nome").val(), //firstname
                cognome = $(this.el).find("#cognome").val(), //lastname
                citta = $(this.el).find("#citta").val(), //city
                cap = $(this.el).find("#cap").val(), //postcode
                provincia = $(this.el).find("#provincia").val(),
                telefono = $(this.el).find("#telefono").val(), //phone_mobile
                indirizzo = $(this.el).find("#indirizzo").val(); //adresses1


            var iduser = localStorage.getItem("idsess");
            var keyorder = localStorage.getItem("keyorder");
            console.log(keyorder);
            var idstate = 148;
            var idaddress;
            var idcart;



            /*****************************************************
             * Costruzione della POST per l'"addresses"
             *****************************************************/
            var synopsis = '<prestashop><address><id></id><id_customer>';
            synopsis += iduser + '</id_customer><id_manufacturer /><id_supplier />';
            synopsis += '<id_warehouse /><id_country>10</id_country><id_state>148</id_state>';
            synopsis += '<alias>';
            synopsis += 'customer</alias><company /><lastname>';
            synopsis += cognome + '</lastname><firstname>' + nome + '</firstname>';
            synopsis += '<vat_number /><address1>';
            synopsis += indirizzo + '</address1><address2 /><postcode>';
            synopsis += cap + '</postcode><city>';
            synopsis += citta + '</city><other /><phone />';
            synopsis += '<phone_mobile>' + telefono + '</phone_mobile>';
            synopsis += '<dni /><deleted/><date_add />';
            synopsis += '<date_upd /></address></prestashop>';



            var autenticazione = function(xhr) {
                var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
                var token = 'Basic '.concat(key64);
                xhr.setRequestHeader('Authorization', token);
            }


            var chiamataAjax = function() {
                $.ajax({
                    url: 'http://192.168.56.101/loveitaly/api/addresses/',
                    async: true,
                    data: synopsis,
                    type: "POST",
                    beforeSend: autenticazione,

                    success: function(result) {

                        var $xml = $(result);
                        var id = $xml.find('id');
                        idaddress = id[0].textContent;

                        /*****************************************************
                         * Costruzione della POST per il "carts"
                         *****************************************************/

                        var synopsis2 = '<prestashop><cart><id /><id_address_delivery>';
                        synopsis2 += idaddress + '</id_address_delivery><id_address_invoice /><id_currency>1</id_currency>';
                        synopsis2 += '<id_customer>' + iduser + '</id_customer><id_guest /><id_lang>1</id_lang><id_shop_group />';
                        synopsis2 += '<id_shop /><id_carrier>8</id_carrier><recyclable /><gift /><gift_message /><mobile_theme />';
                        synopsis2 += '<delivery_option /><secure_key /><allow_seperated_package /><date_add /><date_upd />';
                        synopsis2 += '<associations><cart_rows>';

                        /*****************************************************
                         * Ciclo for per aggiungere ogni ordine reperibile
                         * dal Carrello
                         *****************************************************/

                        for (var i = 0; i < arrayordini.length; i++) {

                            synopsis2 += '<cart_rows><id_product>' + arrayordini[i].id + '</id_product>';
                            synopsis2 += '<id_product_attribute>0</id_product_attribute><id_address_delivery>';
                            synopsis2 += idaddress + '</id_address_delivery><quantity>' + arrayordini[i].quantity;
                            synopsis2 += '</quantity></cart_rows>';
                        }

                        synopsis2 += '</cart_rows></associations></cart></prestashop>';

                        var chiamataAjax2 = function() {
                            $.ajax({
                                url: 'http://192.168.56.101/loveitaly/api/carts/',
                                async: true,
                                data: synopsis2,
                                type: "POST",
                                beforeSend: autenticazione,

                                success: function(result) {
                                    var $xml = $(result);
                                    var id = $xml.find('id');

                                    idcart = id[0].textContent;


                                    /*****************************************************
                                     * Costruzione della POST per l'"orders"
                                     *****************************************************/

                                    var synopsis3 = '<prestashop><order><id/><id_address_delivery>';
                                    synopsis3 += idaddress + '</id_address_delivery><id_address_invoice>' + idaddress + '</id_address_invoice>';
                                    synopsis3 += '<id_cart>' + idcart + '</id_cart><id_currency>1</id_currency><id_lang>1</id_lang>';
                                    synopsis3 += '<id_customer>' + iduser + '</id_customer><id_carrier>21</id_carrier><current_state>10</current_state><module>cashondelivery</module>';
                                    synopsis3 += '<invoice_number /><invoice_date /><invoice_date /><delivery_number /><delivery_date /><valid>0</valid><date_add /><date_upd /><shipping_number /><id_shop_group /><id_shop />';
                                    synopsis3 += '<secure_key>' + keyorder + '</secure_key><payment>Cash on delivery</payment><recyclable /><gift /><gift_message />';
                                    synopsis3 += '<mobile_theme /><total_discounts /><total_discounts_tax_incl /><total_discounts_tax_excl />';


                                    var totale = 0;

                                    for (var i = 0; i < arrayordini.length; i++) {

                                        totale += arrayordini[i].total;

                                    }

                                    totale = parseFloat(totale).toFixed(2);


                                    synopsis3 += '<total_paid>' + totale + '</total_paid><total_paid_tax_incl /><total_paid_tax_excl />';
                                    synopsis3 += '<total_paid_real>0</total_paid_real><total_products>';
                                    synopsis3 += arrayordini.length + '</total_products><total_products_wt>' + arrayordini.length + '</total_products_wt>';
                                    synopsis3 += '<total_shipping /><total_shipping_tax_incl /><total_shipping_tax_excl /><carrier_tax_rate />';
                                    synopsis3 += '<total_wrapping /><total_wrapping_tax_incl /><total_wrapping_tax_excl /><conversion_rate>1';
                                    synopsis3 += '</conversion_rate><reference /><associations><order_rows>';


                                    for (var i = 0; i < arrayordini.length; i++) {

                                        synopsis3 += '<order_rows><id /><product_id>' + arrayordini[i].id + '</product_id>';
                                        synopsis3 += '<product_attribute_id>4</product_attribute_id><product_quantity>' + arrayordini[i].quantity;
                                        synopsis3 += '</product_quantity><product_name>' + arrayordini[i].name + '</product_name><product_reference /><product_ean13 />';
                                        synopsis3 += '<product_upc /><product_price>' + arrayordini[i].price + '</product_price><unit_price_tax_incl /><unit_price_tax_excl /></order_rows>';

                                    }

                                    synopsis3 += '</order_rows></associations></order></prestashop>';

                                    var chiamataAjax3 = function() {
                                        $.ajax({
                                            url: 'http://192.168.56.101/loveitaly/api/orders/',
                                            async: true,
                                            data: synopsis3,
                                            type: "POST",
                                            dataType: 'xml',
                                            contentType: "text/xml",

                                            beforeSend: autenticazione,

                                            success: function(result) {

                                                console.log(result);

                                                Backbone.history.navigate("success", {
                                                    trigger: true
                                                });



                                            },
                                            error: function(XMLHttpRequest, textStatus, errorThrown) {

                                                // qualcosa è andato storto => rimani li

                                            }
                                        })
                                    };

                                    chiamataAjax3();


                                },
                                error: function(XMLHttpRequest, textStatus, errorThrown) {

                                    // qualcosa è andato storto => rimani li!
                                }
                            })
                        };

                        chiamataAjax2();


                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {}
                })
            };

            chiamataAjax();

        }
    });

    return checkoutView;

});
