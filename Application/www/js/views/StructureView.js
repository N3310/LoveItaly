define(function(require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
    var Utils = require("utils");
    var handlebars = require("handlebars");
    var ListSearchView= require("views/pages/ListSearchView");


    var StructureView = Backbone.View.extend({

        constructorName: "StructureView",

        id: "main",

        events: {
            "click #nav1": "myView",
            "keypress #search": "ricerca",
            "click #catView": "catView",
            "click #home": "myView",
            "click #prodotto": "prodotto",
            "click #auth": "auth",
            "click #contact": "contact",
            "click #reserved": "reserved",
            "click #aziende": "aziende",
            "click #faq": "faq",
            "click #login": "login",
            "click #logout": "logout",
            "click #deletefromcart": "deletefromcart",
            "click #svuota": "svuota",
            "click #cartleft-btn": "checkout"
        },

        initialize: function(options) {
            this.template = Utils.templates.structure;
        },

        render: function() {

          /*****************************************************
           * Funzione GPS, Controllo coordinate e chiamata api
           * verso Google maps per ottenere la località
           *****************************************************/


               var latitudine, longitudine;
               //GPS
               var maxAge = 3000,
                   timeout = 5000;

               var onSuccess = function(position) {
                   console.log("Latitude: " + position.coords.latitude);
                   console.log("Longitude: " + position.coords.longitude);


                   console.log(position.coords.latitude);
                   console.log(position.coords.longitude);

                   var urlmio = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=';
                   urlmio += position.coords.latitude + ',';
                   urlmio += position.coords.longitude + '&sensor=true';

                   var chiamataAjax = function() {
                       $.ajax({
                           url: urlmio,
                           async: true,
                           type: "GET",

                           success: function(result) {
                               console.log((result.results[0]).address_components[1].long_name);
                               var posizione = (result.results[0]).address_components[1].long_name;

                               console.log(posizione);

                               /*Loveitaly ha nel DB le località salvate in minuscolo e senza spazi
                               quindi dalla posizione ottenuta dobbiamo eliminare quest'ultimi e mettere
                               tutto in minuscolo in modo da poter fare il confronto*/

                               posizione2 = posizione.toLowerCase()
                               posizione2 = posizione.replace(' ', '');
                               posizione2 = posizione.replace("''", '');

                               // effettuo il controllo con le località ricoperte dal portale

                               switch (posizione2) {
                                   case 'castelfrentano':
                                       localStorage.setItem('localizzazione', 'castelfrentano');
                                       break;
                                   case 'fossacesia':
                                       localStorage.setItem('localizzazione', 'fossacesia');
                                       break;
                                   case 'lanciano':
                                       localStorage.setItem('localizzazione', 'lanciano');
                                       break;
                                   case 'frisa':
                                       localStorage.setItem('localizzazione', 'frisa');
                                       break;
                                   case 'mozzacrogna':
                                       localStorage.setItem('localizzazione', 'mozzacrogna');
                                       break;
                                   case 'ortona':
                                       localStorage.setItem('localizzazione', 'ortona');
                                       break;
                                   case 'roccasangiovanni':
                                       localStorage.setItem('localizzazione', 'roccasangiovanni');
                                       break;
                                   case 'santamariaimbaro':
                                       localStorage.setItem('localizzazione', 'santamariaimbaro');
                                       break;
                                   case 'sanvitochietino':
                                       localStorage.setItem('localizzazione', 'sanvitochietino');
                                       break;
                                   case 'treglio':
                                       localStorage.setItem('localizzazione', 'treglio');
                                       break;
                                   default:
                                       break;
                               }


                           },
                           error: function(XMLHttpRequest, textStatus, errorThrown) {

                               // qualcosa è andato storto => rimani li!
                               alert('Dati GPS errati!');
                           }
                       })
                   };

                   chiamataAjax();
               };

               function onError(error) {
                 var loc= localStorage.getItem("localizzazione");
                 if(loc===null){

                   Backbone.history.navigate("listalocalita", {
                       trigger: true
                   });
                 } else {
                   Backbone.history.navigate("myview", {
                       trigger: true
                   });
                 }


               };

               navigator.geolocation.getCurrentPosition(onSuccess, function(error) {
                   console.log("Failed to retrieve high accuracy position - trying to retrieve low accuracy");
                   navigator.geolocation.getCurrentPosition(onSuccess, onError, {
                       maximumAge: maxAge,
                       timeout: timeout,
                       enableHighAccuracy: false
                   });
               }, {
                   maximumAge: maxAge,
                   timeout: timeout,
                   enableHighAccuracy: true
               });





               //INTERNET CHECKING

               function checkConnection() {
                   var networkState = navigator.connection.type;
                   localStorage.setItem('networkState', networkState);

                   var states = {};
                   states[Connection.UNKNOWN] = 'Unknown connection';
                   states[Connection.ETHERNET] = 'Ethernet connection';
                   states[Connection.WIFI] = 'WiFi connection';
                   states[Connection.CELL_2G] = 'Cell 2G connection';
                   states[Connection.CELL_3G] = 'Cell 3G connection';
                   states[Connection.CELL_4G] = 'Cell 4G connection';
                   states[Connection.CELL] = 'Cell generic connection';
                   states[Connection.NONE] = 'No network connection';


               }

               checkConnection();

               // load the template
               // this.el.innerHTML = this.template(JSON.parse(localStorage["Carrello"]));
               this.el.innerHTML = this.template({});

               // cache a reference to the content element
               this.contentElement = this.$el.find('#content')[0];
               return this;

           },

        catView: function(e) {

            Backbone.history.navigate("categoria", {
                trigger: true
            });
        },

        ricerca: function(e) {

            event.stopPropagation();
            //eseguo quando premo "ENTER" ovvero keycode 13
            if (event.keyCode == '13') {
              var keyword = $(e.target).val();
              localStorage.setItem("datoricerca", keyword);

              if (Backbone.history.fragment === 'listarisultatiricerca') {
                Backbone.history.stop();
                Backbone.history.start()
               } else {

                 }

              Backbone.history.navigate("listarisultatiricerca", {
                   trigger: true
               });



               // start and stop the router per effettuare una seconda
               //ricerca all'istante senza prima cambiare view

            }
          },

        checkout: function(e) {

            var utente = localStorage.getItem("sessione");
            if (utente === null) {
                $('#modal1').closeModal();
                Backbone.history.navigate("login", {
                    trigger: true
                });
            } else {
                $('#modal1').closeModal();
                Backbone.history.navigate("checkout", {
                    trigger: true
                });
            }
        },


        svuota: function(e) {

            $('#contenitore').remove();
            var Carrello = JSON.parse(localStorage["Carrello"]);
            Carrello = [];
            localStorage["Carrello"] = JSON.stringify(Carrello);

            Backbone.history.navigate("basket", {
                trigger: true
            });
        },

        /********************************************************
         * elimino dal carrello in base all'indexcart selezionato!
         * ovvero in base al prodotto che voglio eliminare
         ********************************************************/

        deletefromcart: function(e) {

            $(e.currentTarget).parent().parent().parent().parent().remove();


            var index = $(e.currentTarget).attr("prodName");
            console.log('prodName ' + index);

            var carrello = JSON.parse(localStorage["Carrello"]);

            var objId = 0;

            for(var i = 0; i < carrello.length; i++){
                if(carrello[i].name == index){
                    objId = i;
                    break;
                }
            }

            carrello.splice(objId,1);
            localStorage["Carrello"] = JSON.stringify(carrello);

            Backbone.history.navigate("basket", {
                trigger: true
            });
        },

        login: function(event) {

            var sessione = localStorage.getItem("sessione");

            if (sessione === null) {
                Backbone.history.navigate("login", {
                    trigger: true
                });
            } else {
                alert("Sei già loggato!");
                Backbone.history.navigate("myview", {
                    trigger: true
                });
            }

        },

        logout: function(event) {

            localStorage.removeItem("sessione");
            $('#person-button').remove();
            $('#modal2').closeModal();
            //     effettuare LOGOUT --- CODE
            Backbone.history.navigate("myview", {
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

            Backbone.history.navigate("prodotto", {
                trigger: true
            });
        }
    });

    return StructureView;

});
