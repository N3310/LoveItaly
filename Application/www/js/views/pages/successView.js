define(function(require) {

  var Backbone = require("backbone");
  var ListCategory = require("models/User");
  var Utils = require("utils");

  var successView = Utils.Page.extend({

    constructorName: "successView",


    model: ListCategory,

    initialize: function() {
      
      this.template = Utils.templates.success;

    },

    id: "auth",
    className: "successView",

    events: {
      "click #btn-tornahome": "home"
    },

    render: function() {
      $(this.el).html(this.template());
      return this;
    },

    home: function(e) {
      Backbone.history.navigate("myview", {
        trigger: true
      });
    }
  });

  return successView;

});
