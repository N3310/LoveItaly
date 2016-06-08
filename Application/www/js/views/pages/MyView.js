define(function(require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
    var Products_homepage = require("models/Products_homepage");
    var Products = require("models/Products");
    var MyCollection = require("collections/Categories");
    var Utils = require("utils");
    var productHomepage = require("models/productHomepage");
    var saleProduct = require("models/saleProduct");
    var sweetProduct = require("models/sweetProduct");


    var MyView = Utils.Page.extend({
        constructorName: "MyView",
        model: Products_homepage,

        initialize: function() {
            this.template = Utils.templates.myview;
        },

        id: "myview",
        className: "i-g page",

        events: {
            "click #imgslide": "prodotto",
            "click #bottone-ca": "carrello"
        },

        render: function() {

            /*****************************************************
             * Riempio la home con i miei oggetti di interesse
             *****************************************************/

            var that = this;

            var online = new saleProduct();
            var sale2 = new sweetProduct();
            var arraytest = [];
            var loca = localStorage.getItem("localizzazione");

            online.fetch({
                success: function() {

                    /*****************************************************
                     * Aggiungo immagini e setto a float i prezzi in modo
                     * adeguato
                     *****************************************************/

                    arraytest[0] = (online.attributes);

                    test = online.attributes;

                    sale2.fetch({
                        success: function() {

                            test = sale2.attributes;
                            arraytest[1] = (sale2.attributes);
                            arraytest[2] = loca;

                            for (var i = 0; i < 5; i++) {

                                var idprod = ((arraytest[0][i])).id;
                                var idtemp = (arraytest[0][i]);
                                idimg = (idtemp.associations.images[0]).id;
                                idprod = idprod;
                                var imgSrc = 'http://192.168.56.101/loveitaly/api/images/products/' + idprod + '/' + idimg + '/?ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';


                                ((arraytest[0][i])).img = imgSrc;
                                ((arraytest[0][i])).price = parseFloat(((arraytest[0][i])).price).toFixed(2);
                            }

                            for (var i = 0; i < 5; i++) {

                                var idprod = ((arraytest[1][i])).id;
                                var idtemp = (arraytest[1][i]);
                                idimg = (idtemp.associations.images[0]).id;
                                idprod = idprod;
                                var imgSrc = 'http://192.168.56.101/loveitaly/api/images/products/' + idprod + '/' + idimg + '/?ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';


                                ((arraytest[1][i])).img = imgSrc;
                                ((arraytest[1][i])).price = parseFloat(((arraytest[1][i])).price).toFixed(2);
                            }

                            $(that.el).html(that.template(arraytest));

                            that.startslider();
                            that.startnav();

                            return that;
                        }
                    });
                }
            });

        },

        carrello: function(e) {
            var arraytemp = [];
            arraytemp = localStorage.getItem("Carrello");


            /*****************************************************
             * Prendo nome e prezzo dall'HTML
             *****************************************************/
            var namePrice = $(e.currentTarget).closest('#card-border').find('p').text();
            namePrice = namePrice.replace(/\s+/g, '');
            namePrice = namePrice.split("€");
            /* -- -- */

            var idprod = $(e.currentTarget).closest('#card-border').attr('data-prod');
            name = namePrice[0],
                img = $(e.currentTarget).closest('#card-border').attr('imgSrc');
            price = namePrice[1];
            quantity = 1;

            var prod = new Products({
                name: name,
                id: idprod,
                img: img,
                price: parseFloat(price).toFixed(2),
                quantity: quantity,
                total: price * quantity
            });

            var Carrello = JSON.parse(localStorage["Carrello"]);
            Carrello.push(prod);
            localStorage["Carrello"] = JSON.stringify(Carrello);

            if (Backbone.history.fragment === 'basket') {
                Backbone.history.stop();
                Backbone.history.start()
            }

            Backbone.history.navigate("basket", {
                trigger: true
            });

        },

        prodotto: function(e) {
            e.preventDefault();

            var datoprod = $(e.currentTarget).attr("data-prod");

            localStorage.setItem("datoprod", datoprod);

            Backbone.history.navigate("prodotto", {
                trigger: true
            });
        },


        /*****************************************************
         * Questa funzione serve ad avviare gli elementi della
         * navbar: Ricerca e Carrello e definiscono gli handler
         * per gli eventi che li riguardano
         *****************************************************/

        startnav: function(e) {
            $("#search-button").click(function(e) {
                e.preventDefault();
                $("#menu-button").hide();
                $(this).hide();
                $("#titolo-pagina").hide();
                $("#search-input").css("display", "block");
                $("#search").focus();
            });

            $("#search-input").focusout(function(e) {
                e.preventDefault();
                $("#search-input").hide();
                $("#titolo-pagina").show();
                $("#menu-button").show();
                $("#search-button").show();
                $("#search").val('');
            });

            $("#back-button").click(function(e) {
                e.preventDefault();
                $("#search-input").hide();
                $("#menu-button").show();
                $("#search-button").show();
            });

            $("#person-button").click(function(e) {
                e.preventDefault();
                $('#modal2').openModal({
                  
                });
            });

            $("#cart-button").click(function(e) {
                e.preventDefault();
                $('#modal1').openModal({
                  opacity: 0,
                  complete: function() { $('.lean-overlay').remove() } // Callback for Modal close
                });
            });

            $("#svuota").click(function(e) {
                e.preventDefault();
                $('#modal1').closeModal();
            });
        },

        /*****************************************************
         * Questa funzione serve per avviare lo slider
         *****************************************************/

        startslider: function(e) {
            $(".single-item").slick({
                dots: true,
                arrows: false,
                adaptiveHeight: true
            });
        }
    });

    return MyView;

});
