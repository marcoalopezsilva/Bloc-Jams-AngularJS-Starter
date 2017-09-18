(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

        // currentAlbum is a private attribute, because it is declared here
        /**
        * @desc Holds information on the album the user is currently using
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();

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
                SongPlayer.currentSong.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            SongPlayer.currentSong = song;
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

        // getSongIndex is a private function
        /**
        * @function getSongIndex
        * @desc Gets the index from the current song, to display
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        // SongPlayer.currentSong is a public method
        /**
        * @desc Holds information on the current song
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        // SongPlayer.play is a public method: it is not declared here, and thus is available globally
        /**
        * @desc Plays the current song
        * @type {Object}
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                    if (currentBuzzObject.isPaused()) {
                        currentBuzzObject.play();
                    }
                }
        };

        /**
        * @desc Pauses the current song
        * @type {Object}
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
        * @desc Goes to the previous song
        * @type {Object}
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        return SongPlayer;
    }
    angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
