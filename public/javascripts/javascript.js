$(document).ready(function() {

	$('#song-input').on("keyup", function() {
		var search_results = $('#search-results');
		var search_container = $('#search-container');
		if(this.value.length > 3) {
			$.ajax({
				type: 'POST',
				url: '/search',	
				data: {q: this.value}
			})
				.success(function(data) {
					search_results.html(data);
					if(search_results.html() != "") {
						search_container.removeClass('last');
					} else {
						search_container.addClass('last');
					}
			});
		} else {
			search_results.html('');
			search_container.addClass('last');
		}
	});

	$('#art_container').on("click", function() {
		var search_results = $('#search-results');
		var search_container = $('#search-container');
		search_results.html('');
		search_container.addClass('last');
		$('#song-input')[0].value = '';
	});

	/* attachs events to any new li */
	$('ul').on("click", 'li', function() {
		if(!this.hasAttribute('checked')) {
			var song_uri = this.attributes['data-song'].value;
			playlistModule.addTrack(song_uri);
			this.setAttribute('checked', true);
			this.innerHTML += "<div class='fui-check'></div>";
			
			$.ajax({
				type: 'POST',
				url: '/art',	
				data: {uri: song_uri}
			})
				.success(function(data) {
					var art_container = $('#art_container')[0];
					art_container.innerHTML += data;
					if(playlistModule.getTracks().length == 1) {
						$('#play_button')[0].style.display = 'block';
						$('.todo-search').addClass('new_icon');
					}
			});

		}
	});

	$('#play_button').on('click', function() {
		$('#play_button')[0].style.display = 'none';
		var shuffled_tracks = playlistModule.shuffleTracks();
		var track_string = '';
		for(var i =0, max = shuffled_tracks.length; i<max; i++) {
			if(i==max -1) {
				track_string+= shuffled_tracks[i].replace("spotify:track:", "");
			} else {
				track_string+= shuffled_tracks[i].replace("spotify:track:", "")+",";
			}
			
		}
		var search_results = $('#search-results');
		var search_container = $('#search-container');
		search_results.html('');
		search_container.addClass('last');
		$('#song-input')[0].value = '';

		$('#player-container').html('<iframe src="https://embed.spotify.com/?uri=spotify:trackset:Cover Shuffle:'+track_string+'" frameborder="0" width="360" allowtransparency="true"></iframe>');
		$('#search-container').hide();
	});

});