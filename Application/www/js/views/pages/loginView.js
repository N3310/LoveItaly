define(function(require) {

  var Backbone = require("backbone");
  var ListCategory = require("models/ListCategory");
  var Utils = require("utils");

  var loginView = Utils.Page.extend({

    constructorName: "loginView",

    model: ListCategory,

    initialize: function() {


      // load the precompiled template
      this.template = Utils.templates.login;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {

      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "loginView",
    className: "loginView",

    events: {
      "tap #home": "home",
      "click #register": "register"
    },

    render: function() {

      var stored = JSON.parse(localStorage.getItem("cat"));
    //  $(this.el).html(this.template((this.collection).toJSON()));
    $(this.el).html(this.template(stored));
      return this;
    },

    register: function(event) {

      Backbone.history.navigate("register", {
        trigger: true
      });
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

  return loginView;

});
