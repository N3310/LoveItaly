define(function(require) {

    var Backbone = require("backbone");
    var ListCategory = require("models/ListCategory");
    var Utils = require("utils");

    var localizzatoreView = Utils.Page.extend({

        constructorName: "localizzatoreView",

        model: ListCategory,

        initialize: function() {


            // load the precompiled template
            this.template = Utils.templates.listalocalita;
            // here we can register to inTheDOM or removing events
            // this.listenTo(this, "inTheDOM", function() {
            //   $('#content').on("swipe", function(data){
            //     console.log(data);
            //   });
            // });
            // this.listenTo(this, "removing", functionName);

            // by convention, all the inner views of a view must be stored in this.subViews
        },

        id: "localizzatoreView",
        className: "localizzatoreView",

        events: {
          "click #listaprod": "home"
        },

        render: function() {

            $('#greenNav').hide();
          var localita= localStorage.getItem('localizzazione');
          var loc= new ListCategory({
              loc: localita
          });

            //  $(this.el).html(this.template((this.collection).toJSON()));
            $(this.el).html(this.template(loc));
            return this;

        },

        home: function(e){

          e.preventDefault();

          var dataloc = $(e.currentTarget).attr("data-loc");
          localStorage.setItem("localizzazione", dataloc);

          Backbone.history.navigate("myview", {
              trigger: true
          });

          $("#greenNav").show();

        }




    });

    return localizzatoreView;

});
