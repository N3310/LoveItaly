define(function(require) {

  var Backbone = require("backbone");
  var ListCategory = require("models/ListCategory");
  var Utils = require("utils");

  var catView = Utils.Page.extend({

    constructorName: "catView",

    model: ListCategory,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.catView;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "catView",
    className: "catView",

    events: {
      "tap #home": "home",
      "tap #prodotto": "prodotto",
      "click #listaprod": "listaprod"
    },

    render: function() {

      var contenitore= new Array();
      var stored = JSON.parse(localStorage.getItem("cat"));    //array ottenuto dal localstorage --> accesso piu veloce rispetto a chiamata AJAX


      var immagini = new Array("","","img/img_cat/verdura.jpg","img/img_cat/frutta.jpg","img/img_cat/olio.jpg","img/img_cat/vino.png","img/img_cat/forno.jpg","img/img_cat/miele.jpg","img/img_cat/vino-rosso.jpg","img/img_cat/vino-rosato.jpeg","img/img_cat/vino-bianco.jpg","img/img_cat/pane.png","img/img_cat/dolci.jpg","img/img_cat/pizza.jpg","img/img_cat/sottolio.jpg","img/img_cat/confetture.jpg","img/img_cat/formaggio.jpg","","");

      for (var i = 0; i < 18; i++) {
        var categoria= {
            id: stored[i].id,
            img: immagini[i],
            nome: stored[i].name,
            meta_title:stored[i].meta_title
      }
      contenitore.push(categoria);
    }

    //rimuovo trash ottenuto da Prestashop
      contenitore.splice(0, 2);
      contenitore.splice(15, 2);
      console.log(contenitore);

    //  $(this.el).html(this.template((this.collection).toJSON()));
    $(this.el).html(this.template(contenitore));
      return this;
    },

    home: function(e) {
      Backbone.history.navigate("myview", {
        trigger: true
      });
    },

    listaprod: function(e) {

      e.preventDefault();

      var datocategoria = $(e.currentTarget).attr("data-cat");

      localStorage.setItem("datocategoria", datocategoria);

      Backbone.history.navigate("listaprod", {
        trigger: true
      });
    },

    prodotto: function(e) {
      Backbone.history.navigate("listaprodotti", {
        trigger: true
      });
    }
  });

  return catView;

});
