define(function(require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
    var ListCategory = require("models/ListCategory");
    var Azienda = require("models/Azienda");
    var Categories = require("collections/Categories");
    var Azienda_Collections = require("collections/Azienda_Collections");
    var StructureView = require("views/StructureView");
    var MyView = require("views/pages/MyView");
    var catView = require("views/pages/catView");
    var MapView = require("views/pages/MapView");
  //  var prodottiView = require("views/pages/prodottiView");
    var productView = require("views/pages/productView");
    var authView = require("views/pages/authView");
    var contactView = require("views/pages/contactView");
    var reservedView = require("views/pages/reservedView");
    var aziendeView = require("views/pages/aziendeView");
    var faqView = require("views/pages/faqView");
    var loginView = require("views/pages/loginView");
    var registerView = require("views/pages/registerView");
    var aziendaView = require("views/pages/aziendaView");
    var ListProductByManufacterView = require("views/pages/ListProductByManufacterView");
    var ListProductByCategoryView = require("views/pages/ListProductByCategoryView");
    var ListAz = require("models/ListAz");
    var Products = require("models/Products");
    var ListProductByManufacter = require("models/ListProductByManufacter");
    var ListProductByCategory = require("models/ListProductByCategory");


    var AppRouter = Backbone.Router.extend({

        constructorName: "AppRouter",

        routes: {
            // the default is the structure view
            "": "showStructure",
            "myview": "myView",
            "map": "map",
            "categoria": "categoria",
            "listaprodotti": "listaprodotti",
            "dettaglioprodotto": "dettaglioprodotto",
            "auth": "auth",
            "contact": "contact",
            "reserved": "reserved",
            "aziende": "aziende",
            "faq": "faq",
            "login": "login",
            "register": "register",
            "dettaglio_azienda": "dettaglio_azienda",
            "listbymanu": "listbymanu",
            "listaprod" : "listaprod",
            "prodotto": "prodotto"
        },



        firstView: "myview",

        initialize: function(options) {

          /* Reperisco da JSON API lista CATEGORIE */
          var listcat = new ListCategory();

          listcat.fetch({
              success: function(listcat, response, options) {
                  /*
                  Immagazino il modello della mia lista di categorie all'interno del localStorage
                  in modo da non dover effettuare chiamate API di tale lista in futuro.
                  */
                  localStorage.setItem("cat", JSON.stringify(listcat));

              },
              error: function(listcat, response, options) {
                  console.log('Errore chiamata ajax!');
              }
          });


            /* Reperisco da JSON API lista AZIENDE */
            var lista_azienda = new ListAz();

                lista_azienda.fetch({
                  success: function(lista_azienda, response, options) {
                      /*
                      Immagazino il modello della mia lista di categorie all'interno del localStorage
                      in modo da non dover effettuare chiamate API di tale lista in futuro.
                      */
                      console.log(lista_azienda);
                      localStorage.setItem("lista_azienda", JSON.stringify(lista_azienda));

                  },
                  error: function(lista_azienda, response, options) {
                      console.log('Errore chiamata ajax!');
                  }
                });



            this.currentView = undefined;
        },

        myView: function() {


            var model = new ListCategory();
            // create the view
            var page = new MyView({
                model: model
            });
            // show the view
            this.changePage(page);

            $(".single-item").slick({
                dots: true,
                arrows: false
            });

        },

        dettaglio_azienda: function() {

            var page = new aziendaView({

            });
            this.changePage(page);


        },

        prodotto: function() {

            var page = new productView({

            });
            this.changePage(page);


        },

        listbymanu: function() {

            var page = new ListProductByManufacterView({

            });
            this.changePage(page);


        },

        listaprod: function() {

            var page = new ListProductByCategoryView({

            });
            this.changePage(page);


        },

        faq: function() {


            var model = new ListCategory();
            // create the view
            var page = new faqView({
                model: model
            });
            // show the view
            this.changePage(page);

            $('.collapsible').collapsible({
                accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });

        },
        register: function() {


            var model = new ListCategory();
            // create the view
            var page = new registerView({
                model: model
            });
            // show the view
            this.changePage(page);



        },


        contact: function() {


            var model = new ListCategory();
            // create the view
            var page = new contactView({
                model: model
            });
            // show the view
            this.changePage(page);

        },


        login: function() {


            var model = new ListCategory();
            // create the view
            var page = new loginView({
                model: model
            });
            // show the view
            this.changePage(page);

        },

        reserved: function() {


            var model = new ListCategory();
            // create the view
            var page = new reservedView({
                model: model
            });
            // show the view
            this.changePage(page);

        },

        categoria: function() {


            var page = new catView({
            });
            // show the view
            this.changePage(page);
        },

        listaprodotti: function() {
            // highlight the nav1 tab bar element as the current one

            // create a model with an arbitrary attribute for testing the template engine
            var model = new ListCategory({
                key: "testValue"
            });
            // create the view
            var page = new prodottiView({
                model: model
            });
            // show the view
            this.changePage(page);
        },

        aziende: function() {
            // highlight the nav1 tab bar element as the current one

            // create the view
            var page = new aziendeView({  });
            // show the view
            this.changePage(page);
        },

        dettaglioprodotto: function() {
            // highlight the nav1 tab bar element as the current one

            // create a model with an arbitrary attribute for testing the template engine
            var model = new ListCategory({
                key: "testValue"
            });
            // create the view
            var page = new productView({
                model: model
            });
            // show the view
            this.changePage(page);
        },

        auth: function() {
            // highlight the nav1 tab bar element as the current one

            // create a model with an arbitrary attribute for testing the template engine
            var model = new ListCategory({
                key: "testValue"
            });
            // create the view
            var page = new authView({
                model: model
            });
            // show the view
            this.changePage(page);
        },

        // load the structure view
        showStructure: function() {
            if (!this.structureView) {
                this.structureView = new StructureView();
                // put the el element of the structure view into the DOM
                document.body.appendChild(this.structureView.render().el);
                this.structureView.trigger("inTheDOM");
            }
            // go to first view
            this.navigate(this.firstView, {
                trigger: true
            });
        },

    });

    return AppRouter;

});
