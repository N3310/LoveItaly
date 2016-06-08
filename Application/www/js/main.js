require.config({
    paths: {
        jquery: '../lib/jquery/jquery-2.2.4',
        slider: '../lib/slick/slick.min',
        materialize: '../lib/materialize/js/materialize.amd',
        underscore: '../lib/underscore/underscore',
        backbone: "../lib/backbone/backbone",
        text: '../lib/require/text',
        async: '../lib/require/async',
        handlebars: '../lib/handlebars/handlebars',
        templates: '../templates',
        leaflet: '../lib/leaflet/leaflet',
        spin: '../lib/spin/spin.min',
        preloader: '../lib/preloader/pre-loader',
        utils: '../lib/utils/utils',
        session: '../lib/backbone.session',
        md5: '../lib/md5.min'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'leaflet': {
            exports: 'L'
        },

        'materialize': {
            deps: ['jquery', 'slider'],
            exports: 'Materialize'
        },

        'slider': {
            deps: ['jquery'],
            exports: 'Slider'
        }
    }
});

require(['backbone', 'utils'], function(Backbone, Utils) {
    require(['preloader', 'router'], function(PreLoader, AppRouter) {

        document.addEventListener("deviceready", run, false);

        require(['materialize', 'jquery'], function(Materialize, $) {
            document.addEventListener("deviceready", initializeComponents, false);

            function initializeComponents() {
                require(
                    ['velocity', 'jquery.easing', 'animation', 'hammerjs', 'jquery.hammer', 'global', 'collapsible', 'dropdown', 'leanModal', 'materialbox', 'parallax', 'tabs', 'tooltip', 'waves', 'toasts', 'sideNav', 'scrollspy', 'forms', 'slider', 'cards', 'pushpin', 'buttons', 'scrollFire', 'transitions', 'picker', 'picker.date', 'character_counter'],
                    function() {
                        $('.button-collapse').sideNav();
                        $('.collapsible').collapsible({
                            accordion: false
                        });
                    });
            }

        });


        function run() {

            // Here we precompile ALL the templates so that the app will be quickier when switching views
            // see utils.js
            Utils.loadTemplates().once("templatesLoaded", function() {

                var images = []; // here the developer can add the paths to the images that he would like to be preloaded

                if (images.length) {
                    new PreLoader(images, {
                        onComplete: startRouter
                    });
                } else {
                    // start the router directly if there are no images to be preloaded
                    startRouter();
                }

                function startRouter() {
                    // launch the router
                    var router = new AppRouter();
                    Backbone.history.start();
                }
            });
        }

    });
});
