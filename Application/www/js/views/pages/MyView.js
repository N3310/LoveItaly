define(function(require) {

    var Backbone = require("backbone");
    var ListCategory = require("models/ListCategory");
    var MyCollection = require("collections/Categories");
    var Utils = require("utils");

    var MyView = Utils.Page.extend({

        constructorName: "MyView",

        id: "mapView",

        model: ListCategory,

        initialize: function() {


            this.template = Utils.templates.myview;

            // load the precompiled template

            // here we can register to inTheDOM or removing events
            // this.listenTo(this, "inTheDOM", function() {
            //   $('#content').on("swipe", function(data){
            //     console.log(data);
            //   });
            // });
            // this.listenTo(this, "removing", functionName);

            // by convention, all the inner views of a view must be stored in this.subViews
        },

        id: "myview",
        className: "i-g page",

        events: {
            "tap #goToMap": "goToMap",
            "tap li#catView": "catView",
            "tap li#prodotto": "prodotto"
        },

        render: function() {

        console.log(this.model.toJSON());
            //$(this.el).html(this.template(this.model));
           $(this.el).html(this.template(this.model.toJSON()));
            //  $(this.el).html(this.template(JSON.stringify(this.model)));

            return this;
        },

        goToMap: function(e) {
            Backbone.history.navigate("map", {
                trigger: true
            });
        },
        catView: function(event) {
            Backbone.history.navigate("catView", {
                trigger: true
            });
        },
        prodotto: function(e) {
            Backbone.history.navigate("listaprodotti", {
                trigger: true
            });
        }
    });

    return MyView;

});
