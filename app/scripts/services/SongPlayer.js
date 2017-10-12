(function() {
    function SongPlayer($rootScope, Fixtures) {
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

            // The following .bind comes from the Buzz library - allows for attaching event handlers to buzz objects
            // timeupdate is a HTML5 audio event
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
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
            // I introduced next line to monitor what goes on when user clicks
            console.log("playSong function called on song " + (getSongIndex(song)+1) );
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

        // stopSong is a private function
        /**
        * @function stopSong
        * @desc Stops the current Buzz object and changes (to false) the song's playing attribute
        * @param {Object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            // Junior: Instructions for next line state:  song.playing = null;
            // however, that results in undefined. So I replaced with:
            SongPlayer.currentSong.playing = null;
            // I introduced next line to monitor what goes on when user clicks
            console.log("stopSong function called on song " + (getSongIndex(song)+1) );
        };

        // SongPlayer.currentSong and .currentTime are public methods
        /**
        * @desc Holds information on the current song
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;

        /**
        * @desc Holds current volume
        * @type {Number}
        */
        // Note for Junior: This was originally set as 'null', so I guess that was making the volume seekbar to appear at 0 at page load
        SongPlayer.volume = 50;

        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        /**
        * @function setVolume
        * @desc Sets a new volume level when user cliks on seek bar
        * @param {Number} newVolume
        */
        SongPlayer.setVolume = function(newVolume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(newVolume);
                console.log("Volume now set at " + newVolume);
            }
        };

        // SongPlayer.play is a public function
        /**
        * @function play
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
                        playSong(song);
                    }
                }
        };

        /**
        + @function pause
        * @desc Pauses the current song
        * @type {Object}
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
            // I introduced next line to monitor what goes on when user clicks
            console.log("pause method called on song " + (getSongIndex(song)+1) );
        };

        /**
        * @desc Goes to the previous song
        * @type {Object}
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @desc Goes to the next song
        * @type {Object}
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            // Checks if user goes over the album's last song - if so, stops playing
            if (currentSongIndex >= currentAlbum.songs.length) {
                stopSong(song);
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
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
