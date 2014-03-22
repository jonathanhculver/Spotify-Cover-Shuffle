var playlistModule = (function() {

    /* private var */
    var tracksArray = [],
        shuffleArray = [];

    /* public methods */
    var addTrack = function(uri) {
        tracksArray.push(uri);
        return tracksArray;
    }

    var removeTrack = function(uri) {
        var index = findTrackIndex(uri);
        tracksArray.splice(index, 1);
        return tracksArray;
    }

    /* used for shuffle function */
    var markPlayed = function(index) {
        shuffleArray.splice(index, 1);
    }

    var getTracks = function() {
        return tracksArray;
    }

    var findTrackIndex = function(uri) {
        for(var i = 0; i< tracksArray.length; i++) {
            if(tracksArray[i] == uri) {
                return i;
            }
        }
    }

    var shuffleTracks = function() {
        var tempArray = [];
        var maxNum = tracksArray.length;

        /* made a copy of the array */
        shuffleArray = tracksArray.slice(0);

        for(var i=0, max = tracksArray.length; i<max; i++) {

            var randomNum = Math.floor(Math.random() * maxNum);
            var nextTrack = shuffleArray[randomNum];

            markPlayed(randomNum);
            tempArray.push(nextTrack);
            maxNum--;
        }

        return tempArray;

    }

    return {
        getTracks: getTracks,
        removeTrack: removeTrack,
        addTrack: addTrack,
        shuffleTracks: shuffleTracks
    };

})();