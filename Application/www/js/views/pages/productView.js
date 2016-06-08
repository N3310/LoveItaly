define(function(require) {

    var Backbone = require("backbone");
    var Products = require("models/Products");
    var Carrello = require("collections/Carrello");
    var Utils = require("utils");

    var productView = Utils.Page.extend({

        constructorName: "productView",


        model: Products,

        initialize: function() {
            this.template = Utils.templates.prodotto;
        },

        id: "dettaglio",
        className: "productView",

        events: {
            "click #addtocart": "addtocart"
        },

        render: function() {


            var temp = localStorage.getItem("datoprod");

            var model = new Products({
                id: temp
            });

            var that = this;
            model.fetch({
                success: function() {

                    var temptext = model.get('description');
                    var tempprice = model.get('price');

                    var idprod = model.get('id');
                    var idtemp = model.toJSON();
                    idimg = (idtemp.associations.images[0]).id;
                    idprod = idprod;

                    model.set("img", 'http://192.168.56.101/loveitaly/api/images/products/' + idprod + '/' + idimg + '/?ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H');
                    console.log(model.toJSON());

                    /*****************************************************
                     * Funzione jQuery per eliminare tag HTML/XML
                     * lasciando solo il testo
                     *****************************************************/

                    model.set("description", $(temptext).text());
                    model.set("price", parseFloat(tempprice).toFixed(2));


                    $(that.el).html(that.template(model.toJSON()));

                    /* -- Codice dei bottoni -- */
                    var cont = 1;
                    $("#l-btn").click(function(e) {
                        if (cont > 1) {
                            cont--;
                            $('#span-number').html(cont);
                        }
                    });

                    $("#r-btn").click(function(e) {
                        if (cont < 15) {
                            cont++;
                            $('#span-number').html(cont);
                        }
                    });

                    /* -- -- */

                    return that;
                }
            });
        },

        addtocart: function(e) {

            el: $("#product-form");
            var arraytemp = [];
            arraytemp = localStorage.getItem("Carrello");
            var self = this;

            /*****************************************************
             * Prendo valori da HTML
             *****************************************************/

            var idprod = $(this.el).find("#id_prodotto").val(),
                name = $(this.el).find("#name").val(),
                img = $(this.el).find("#img").val(),
                price = $(this.el).find("#price").val(),
                quantity = $(this.el).find("#span-number").html();

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
        }
    });

    return productView;

});
