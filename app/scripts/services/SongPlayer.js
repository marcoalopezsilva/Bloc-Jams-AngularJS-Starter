(function() {
    function SongPlayer() {
        var SongPlayer = {};

        // currentSong is a private attribute because it is available locally (we declare it within this scope)
        /**
        * @desc Holds information on the current song
        * @type {Object}
        */
        var currentSong = null;


        // currentBuzzObject is declared here, so it is a private (local) attribute
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;


        // setSong is a private function (it is declared here)
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            currentSong = song;
        };

        /**
        * @function playSong
        playSong is a private function
        * @desc Plays the current Buzz object and identifies that the song is, indeed, playing (by setting to true the song.playing attribute)
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        // SongPlayer is a public method: it is not declared here, and thus is available globally
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
                } else if (currentSong === song) {
                    if (currentBuzzObject.isPaused()) {
                        currentBuzzObject.play();
                    }
                }
        };

        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };

        return SongPlayer;
    }
    angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
