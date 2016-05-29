define(function(require) {

  var Backbone = require("backbone");
  var ListCategory = require("models/ListCategory");
  var Utils = require("utils");

  var authView = Utils.Page.extend({

    constructorName: "authView",


    model: ListCategory,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.auth;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "auth",
    className: "authView",

    events: {
      "tap #home": "home"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    home: function(e) {
      Backbone.history.navigate("MyView", {
        trigger: true
      });
    }
  });

  return authView;

});
