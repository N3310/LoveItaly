define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var Utils = require("utils");


  var StructureView = Backbone.View.extend({

    constructorName: "StructureView",

    id: "main",

    events: {
      "click #nav1": "myView",
      "click #catView": "catView",
      "click #home": "myView",
      "click #prodotto": "prodotto",
      "click #dettaglio": "detail",
      "click #auth": "auth",
      "click #contact": "contact",
      "click #reserved": "reserved",
      "click #aziende": "aziende",
      "click #faq": "faq",
      "click #login": "login"
        },

    initialize: function(options) {

      
      // load the precompiled template
      this.template = Utils.templates.structure;
      //this.on("inTheDOM", this.rendered);
      // bind the back event to the goBack function
      //document.getElementById("back").addEventListener("back", this.goBack(), false);
    },

    render: function() {
      // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      return this;
    },

    // rendered: function(e) {
    // },

    // generic go-back function
    goBack: function() {
      //window.history.back();
    },

  /*  setActiveTabBarElement: function(elementId) {
      // here we assume that at any time at least one tab bar element is active
      document.getElementsByClassName("active")[0].classList.remove("active");
      document.getElementById(elementId).classList.add("active");
    },

    map: function(event) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    }, */

    catView: function(event) {

      Backbone.history.navigate("categoria", {
        trigger: true
      });
    },

    login: function(event) {

      Backbone.history.navigate("login", {
        trigger: true
      });
    },

    faq: function(event) {

      Backbone.history.navigate("faq", {
        trigger: true
      });
    },

    reserved: function(event) {

      Backbone.history.navigate("reserved", {
        trigger: true
      });
    },

    contact: function(event) {

      Backbone.history.navigate("contact", {
        trigger: true
      });
    },

    aziende: function(event) {

      Backbone.history.navigate("aziende", {
        trigger: true
      });
    },
    auth: function(event) {

      Backbone.history.navigate("auth", {
        trigger: true
      });
    },

    myView: function(event) {

    //test
      Backbone.history.navigate("myview", {
        trigger: true
      });
    },
    prodotto: function(e) {
      Backbone.history.navigate("listaprodotti", {
        trigger: true
      });
    },

    detail: function(event) {

      Backbone.history.navigate("dettaglioprodotto", {
        trigger: true
      });
    }
  });

  return StructureView;

});
