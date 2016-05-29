define(function(require) {

    var Backbone = require("backbone");
    var Azienda = require("models/Azienda");
    var Utils = require("utils");
    var ListProductByManufacterView= require("views/pages/ListProductByManufacterView");

    var aziendaView = Utils.Page.extend({

        constructorName: "aziendaView",

        model: Azienda,

        initialize: function() {


            // load the precompiled template
            this.template = Utils.templates.dettaglio_azienda;
            // here we can register to inTheDOM or removing events
            // this.listenTo(this, "inTheDOM", function() {
            //   $('#content').on("swipe", function(data){
            //     console.log(data);
            //   });
            // });
            // this.listenTo(this, "removing", functionName);

            // by convention, all the inner views of a view must be stored in this.subViews
        },

        id: "dettaglio_azienda",
        className: "aziendaView",

        events: {
            "click #listbymanu": "listbymanu"
        },

        render: function() {


            var temp = localStorage.getItem("datoazienda");
            console.log(temp);
            var model = new Azienda({id:temp});

            var that=this;
            model.fetch({
                success: function() {

                  var temptext= model.get('short_description');

                  //uso funzione  JQUERY per eliminare <tag> html introdotti da prestashop
                  model.set("short_description", $(temptext).text());
                  console.log(model.toJSON());

                  $(that.el).html(that.template(model.toJSON()));
                  return that;
                    //  $(this.el).html(this.template((this.collection).toJSON()));
                }
            });


        },

        listbymanu: function(e) {
            Backbone.history.navigate("listbymanu", {
                trigger: true
            });
        }
    });

    return aziendaView;

});
