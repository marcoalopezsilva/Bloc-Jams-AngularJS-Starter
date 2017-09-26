(function () {
    // For directives, the callback function (in this case, seekBar) is a factory function.
    // We've named the directive seekBar, which means Angular will look for seek-bar in the HTML and call this directive when it finds that markup
    function seekBar() {
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: { },
            link: function(scope, element, attributes) {
                // Code pending
            }
        };
    }

    angular
        .module('blocJams')
        .directive('seekBar', seekBar);
})();
