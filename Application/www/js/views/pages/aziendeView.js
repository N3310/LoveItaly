define(function(require) {

  var Backbone = require("backbone");
  var ListCategory = require("models/ListCategory");
  var Utils = require("utils");

  var aziendeView = Utils.Page.extend({

    constructorName: "aziendeView",

    model: ListCategory,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.aziende;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "aziendeView",
    className: "aziendeView",

    events: {
      "tap #home": "home",
      "tap #prodotto": "prodotto",
      "click #dettaglio_azienda": "dettaglio_azienda"
    },

    render: function() {

      stored = JSON.parse(localStorage.getItem("lista_azienda"));

      console.log(stored);

    //  $(this.el).html(this.template((this.collection).toJSON()));
    $(this.el).html(this.template(stored));
      return this;
    },

    dettaglio_azienda: function(e) {

      e.preventDefault();

      var datoazienda = $(e.currentTarget).attr("data-az");

      localStorage.setItem("datoazienda", datoazienda);

      Backbone.history.navigate("dettaglio_azienda", {
        trigger: true
      });
    }
  });

  return aziendeView;

});
