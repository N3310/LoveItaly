define(function(require) {

  var Backbone = require("backbone");
  var ListCategory = require("models/ListCategory");
  var Utils = require("utils");

  var reservedView = Utils.Page.extend({

    constructorName: "reservedView",


    model: ListCategory,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.reserved;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "prodotto",
    className: "reservedView",

    events: {
      "tap #home": "home",
      "tap #dettaglio": "detail"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    home: function(e) {
      Backbone.history.navigate("MyView", {
        trigger: true
      });
    },
    detail: function(event) {

      Backbone.history.navigate("dettaglioprodotto", {
        trigger: true
      });
    }
  });

  return reservedView;

});
