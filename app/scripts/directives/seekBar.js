(function () {
    // For directives, the callback function (in this case, seekBar) is a factory function.
    // We've named the directive seekBar, which means Angular will look for seek-bar in the HTML and call this directive when it finds that markup
    // With Angular, $document must be injected as a dependency if we want to access the  window.document object
    function seekBar($document) {

        var calculatePercent = function (seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };

        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            // A new "isolate" scope is created for the directive's template.
            // The 'isolate' scope differs from normal scope in that it does not prototypically inherit from its parent scope.
            // This is useful when creating reusable components, which should not accidentally read or modify data in the parent scope.
            scope: { },
            link: function(scope, element, attributes) {
                scope.value = 0;
                scope.max = 100;

                var seekBar = $(element);

                var percentString = function () {
                     var value = scope.value;
                     var max = scope.max;
                     var percent = value / max * 100;
                     return percent + "%";
                };

                // When adding properties to the $scope object in the controller, the view (HTML) gets access to these properties
                scope.fillStyle = function () {
                    return {width: percentString()};
                };

                scope.onClickSeekBar = function (event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };

                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function (event) {
                        var percent = calculatePercent(seekBar, event);
                        //$scope.$apply() takes a function or an Angular expression string, and executes it, then calls $scope.$digest() to update any bindings or watchers.//
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                        });
                    });
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };

                // This method added for Chekpoint9-Assignment
                scope.thumbStyle = function() {
                    return {left: percentString()};
                };
            }
        };
    }

    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();
