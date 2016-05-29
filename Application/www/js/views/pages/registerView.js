define(function(require) {

  var Backbone = require("backbone");
  var ListCategory = require("models/ListCategory");
  var Utils = require("utils");

  var registerView = Utils.Page.extend({

    constructorName: "registerView",

    model: ListCategory,

    initialize: function() {


      // load the precompiled template
      this.template = Utils.templates.register;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {

      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "registerView",
    className: "registerView",

    events: {
      "tap #home": "home"
    },

    render: function() {

      var stored = JSON.parse(localStorage.getItem("cat"));
    //  $(this.el).html(this.template((this.collection).toJSON()));
    $(this.el).html(this.template(stored));
      return this;
    },

    home: function(e) {
      Backbone.history.navigate("myview", {
        trigger: true
      });
    },
    prodotto: function(e) {
      Backbone.history.navigate("listaprodotti", {
        trigger: true
      });
    }
  });

  return registerView;

});
