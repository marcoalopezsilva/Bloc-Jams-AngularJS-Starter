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
                templateUrl: '/templates/landing.html'
            })
            //Next block is of the Bloc Jams logo which take one to home
            .state ('logo', {
                url: 'assets/images/bloc_jams_logo.png',
            })
            // When we navigate to localhost:3000/album, the ui-view directive in the global file will load the album template
            .state ('album', {
                url: '/album',
                templateUrl: '/templates/album.html'
            })
            .state ('collection', {
                url: '/collection',
                templateUrl: '/templates/collection.html'
            });
     }

     angular
        .module('blocJams', ['ui.router'])
        .config(config);
})();
