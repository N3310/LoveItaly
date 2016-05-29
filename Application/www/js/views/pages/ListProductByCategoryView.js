define(function(require) {

    var Backbone = require("backbone");
    var ListProductByCategory = require("models/ListProductByCategory");
    var Utils = require("utils");
    var Products = require("models/Products");
    var productView = require("views/pages/productView");

    var ListProductByCategoryView = Utils.Page.extend({

        constructorName: "ListProductByCategoryView",

        model: ListProductByCategory,

        initialize: function(variabile) {

            // load the precompiled template
            this.template = Utils.templates.listaprodotti;


            // here we can register to inTheDOM or removing events
            // this.listenTo(this, "inTheDOM", function() {
            //   $('#content').on("swipe", function(data){
            //     console.log(data);
            //   });
            // });
            // this.listenTo(this, "removing", functionName);

            // by convention, all the inner views of a view must be stored in this.subViews
        },

        id: "ListProductByCategoryView",
        className: "ListProductByCategoryView",

        events: {
            "tap #home": "home",
            "click #prodotto": "prodotto"
        },

        render: function() {

            var temp = localStorage.getItem("datocategoria");
            console.log(temp);
            var model = new ListProductByCategory({
                id: temp
            });

            var that = this;
            model.fetch({
                success: function() {
                    console.log(model.toJSON());
                    var temp= model.toJSON();
                    console.log(temp.size);

                    $(that.el).html(that.template(model.toJSON()));
                    return that;
                    //  $(this.el).html(this.template((this.collection).toJSON()));
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

    return ListProductByCategoryView;

});
