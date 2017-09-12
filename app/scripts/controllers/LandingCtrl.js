(function() {
    function LandingCtrl() {
        // To initialize the $scope object, a controller attaches properties to it
        // Using the 'this' keyword adds 'heroTitle' as a property on the LandingCtrl's $scope object.
        // $scope properties contain the model, or data, that the view will present, and are available to the template at the point in the DOM where the controller is registered.
        this.heroTitle = 'Turn the Music Up!';
    }
    angular
        .module('blocJams')
        .controller('LandingCtrl', LandingCtrl);
}) ();
