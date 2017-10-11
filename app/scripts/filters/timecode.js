// Filter functions must return another function which takes at least one argument (the input of the filter – seconds)
(function() {
    function timecode(SongPlayer) {
        return function(seconds) {
            var output = buzz.toTimer(seconds)

            //if (Number.isNaN(seconds)) {
            //    return '--:--';
            //}

            return output;

        };
    }

    angular
        .module('blocJams')
        .filter('timecode', ['SongPlayer', timecode]);
})();
