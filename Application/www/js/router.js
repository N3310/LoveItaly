define(function(require) {

    var $ = require("jquery");
    var slick = require("slider");
    var Backbone = require("backbone");
    var ListCategory = require("models/ListCategory");
    var Azienda = require("models/Azienda");
    var Categories = require("collections/Categories");
    var Carrello = require("collections/Carrello");
    var StructureView = require("views/StructureView");
    var MyView = require("views/pages/MyView");
    var catView = require("views/pages/catView");
    var productView = require("views/pages/productView");
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
    var SearchList = require("models/SearchList");
    var Products_homepage = require("models/Products_homepage");
    var ListProductByManufacter = require("models/ListProductByManufacter");
    var ListProductByCategory = require("models/ListProductByCategory");
    var basketView = require("views/pages/basketView");
    var checkoutView = require("views/pages/checkoutView");
    var ListSearchView = require("views/pages/ListSearchView");
    var noconnessioneView = require("views/pages/noconnessioneView");
    var successView = require("views/pages/successView");
    var listalocalitaView = require("views/pages/listalocalitaView");



    var AppRouter = Backbone.Router.extend({

        constructorName: "AppRouter",

        routes: {

            "": "showStructure",
            "myview": "myView",
            "map": "map",
            "categoria": "categoria",
            "listaprodotti": "listaprodotti",
            "contact": "contact",
            "reserved": "reserved",
            "aziende": "aziende",
            "faq": "faq",
            "login": "login",
            "register": "register",
            "dettaglio_azienda": "dettaglio_azienda",
            "listbymanu": "listbymanu",
            "listaprod": "listaprod",
            "prodotto": "prodotto",
            "basket": "basket",
            "checkout": "checkout",
            "listarisultatiricerca": "listarisultatiricerca",
            "success": "success",
            "listalocalita": "listalocalita"
        },

        firstView: "myview",

        initialize: function(options) {

            var Carrello = new Array();
            if (localStorage.getItem("Carrello") === null) {
                localStorage["Carrello"] = JSON.stringify(Carrello);
            }
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
                    (lista_azienda);
                    localStorage.setItem("lista_azienda", JSON.stringify(lista_azienda));

                },
                error: function(lista_azienda, response, options) {
                }
            });

            this.currentView = undefined;
        },

        myView: function() {


            /*****************************************************
             * Controllo stato connessione e scelgo la route da
             * indirizzare
             *****************************************************/

            var connessione = localStorage.getItem('networkState');

            if (connessione != 'none') {
                var page = new MyView({});
                this.changePage(page);
                $(".single-item").slick({
                    dots: true,
                    arrows: false
                });
            } else {
                var page = new noconnessioneView({});
                this.changePage(page);
            }
        },

        basket: function() {

            $('#contenitore').remove();
            var basket = new basketView({});

            return $("#prod-list").append(basket.render());
        },

        success: function() {

            var page = new successView({});
            this.changePage(page);

        },

        checkout: function() {
            var page = new checkoutView({

            });
            this.changePage(page);

        },

        listalocalita: function() {
            var page = new listalocalitaView({});
            this.changePage(page);

        },

        dettaglio_azienda: function() {
            var page = new aziendaView({});
            this.changePage(page);
        },

        prodotto: function() {

            var page = new productView({});
            this.changePage(page);

        },

        listbymanu: function() {
            var page = new ListProductByManufacterView({});
            this.changePage(page);
        },

        listaprod: function() {
            var page = new ListProductByCategoryView({});
            this.changePage(page);
        },

        listarisultatiricerca: function() {

            var page = new ListSearchView({});

            this.changePage(page);

        },

        faq: function() {

            var model = new ListCategory();
            var page = new faqView({
                model: model
            });

            this.changePage(page);

            $('.collapsible').collapsible({
                accordion: false
            });

        },
        register: function() {
            var model = new ListCategory();
            var page = new registerView({
                model: model
            });
            this.changePage(page);
        },
        contact: function() {
            var model = new ListCategory();
            var page = new contactView({
                model: model
            });
            this.changePage(page);
        },


        login: function() {
            var model = new ListCategory();
            var page = new loginView({
                model: model
            });
            this.changePage(page);
        },

        reserved: function() {
            var model = new ListCategory();
            var page = new reservedView({
                model: model
            });
            this.changePage(page);
            $('#modal2').closeModal();
        },

        categoria: function() {
            var page = new catView({});
            this.changePage(page);
        },

        listaprodotti: function() {
            var model = new ListCategory({
                key: "testValue"
            });
            var page = new prodottiView({
                model: model
            });
            this.changePage(page);
        },

        aziende: function() {
            var page = new aziendeView({});
            this.changePage(page);
        },

        prodotto: function() {
            var model = new ListCategory({
                key: "testValue"
            });
            var page = new productView({
                model: model
            });
            this.changePage(page);
        },



        showStructure: function() {
            if (!this.structureView) {
                this.structureView = new StructureView();

                document.body.appendChild(this.structureView.render().el);
                this.structureView.trigger("inTheDOM");
            }

            var sessione = localStorage.getItem("sessione");
            if (sessione != null) {
                $(".right").append('<li><a id="person-button" ><i class="material-icons">person</i></a></li>');
            }

            this.navigate(this.firstView, {
                trigger: true
            });
        },

    });

    return AppRouter;

});
