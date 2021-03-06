(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
        .html5Mode({
            //Removes the #! from the url
            enabled: true,
            requireBase: false
        });

        $stateProvider
            // When navigating to localhost:3000, the ui-view directive in index.html will load the template associated with the landing state
            .state ('landing', {
                // Question for Junior: Why is the next line not '/landing' if landing.html is inside the templates folder (as are album.html and collection.html)?
                url: '/',
                controller: 'LandingCtrl as landing',
                templateUrl: '/templates/landing.html'
            })
            // When we navigate to localhost:3000/album, the ui-view directive in the global file will load the album template
            .state ('album', {
                url: '/album',
                controller: 'AlbumCtrl as album',
                templateUrl: '/templates/album.html'
            })
            .state ('collection', {
                url: '/collection',
                controller: 'CollectionCtrl as collection',
                templateUrl: '/templates/collection.html'
            });
     }

     angular
        .module('blocJams', ['ui.router'])
        .config(config);
})();
