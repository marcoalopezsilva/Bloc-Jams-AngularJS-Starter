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
                url: '/',
                templateUrl: '/templates/landing.html'
            })
            // when we navigate to localhost:3000/album, the ui-view directive in the global file will load the album template
            .state ('album', {
                url: '/album',
                templateUrl: '/templates/album.html'
            });
     }

     angular
        .module('blocJams', ['ui.router'])
        .config(config);
})();
