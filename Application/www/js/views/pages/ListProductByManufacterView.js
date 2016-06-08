define(function(require) {

    var Backbone = require("backbone");
    var ListProductByManufacter = require("models/ListProductByManufacter");
    var Utils = require("utils");

    var ListProductByManufacterView = Utils.Page.extend({

        constructorName: "ListProductByManufacterView",

        model: ListProductByManufacter,

        initialize: function(variabile) {

            this.template = Utils.templates.listaprodotti;

        },

        id: "ListProductByManufacterView",
        className: "ListProductByManufacterView",

        events: {
            "click #prodotto": "prodotto"
        },

        render: function() {

            var temp = localStorage.getItem("datoazienda");
            var model = new ListProductByManufacter({
                id: temp
            });

            var that = this;
            model.fetch({
                success: function() {
                    var temp2 = model.toJSON();


                    /*****************************************************
                     * Costruzione della lista con immagini relative
                     *****************************************************/

                  for (var i = 0; i < Object.keys(temp2).length - 1; i++) {
                        var idprod = ((model.toJSON())[i]).id;
                        var idtemp = model.toJSON()[i];
                        idimg = (idtemp.associations.images[0]).id;
                        idprod = idprod;
                        var img2 = 'http://192.168.56.101/loveitaly/api/images/products/' + idprod + '/' + idimg + '/?ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';
                        ((model.toJSON())[i]).img = img2;
                        ((model.toJSON())[i]).price = parseFloat(((model.toJSON())[i]).price).toFixed(2);
                    }
                    $(that.el).html(that.template(model.toJSON()));
                    return that;
                }
            });
        },

        prodotto: function(e) {

            e.preventDefault();

            var datoprod = $(e.currentTarget).attr("data-prod");

            localStorage.setItem("datoprod", datoprod);

            Backbone.history.navigate("prodotto", {
                trigger: true
            });
        }



    });

    return ListProductByManufacterView;

});
