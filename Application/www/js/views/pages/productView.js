define(function(require) {

  var Backbone = require("backbone");
  var Products = require("models/Products");
  var Utils = require("utils");

  var productView = Utils.Page.extend({

    constructorName: "productView",


    model: Products,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.dettaglioprodotto;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "dettaglio",
    className: "productView",

    events: {
      "tap #home": "home"
    },

    render: function() {

      var temp = localStorage.getItem("datoprod");
      console.log(temp);
      var model = new Products({id:temp});

      var that=this;
      model.fetch({
          success: function() {
            //num = num.toFixed(2)
            var temptext= model.get('description');
            var tempprice= model.get('price');

            //uso funzione  JQUERY per eliminare <tag> html introdotti da prestashop
            model.set("description", $(temptext).text());
            model.set("price", parseFloat(tempprice).toFixed(2));


            $(that.el).html(that.template(model.toJSON()));
            return that;
              //  $(this.el).html(this.template((this.collection).toJSON()));
          }
      });
    },

    home: function(e) {
      Backbone.history.navigate("MyView", {
        trigger: true
      });
    }
  });

  return productView;

});
