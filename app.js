var express = require('express');
var spotify = require('spotify');
var path = require('path');
var request = require('request');
var app = express();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.use(express.static(path.join(__dirname, 'public')));
    app.set('view engine', 'jade');
    app.use(express.urlencoded());
});

app.get('/', function(req, res){
	res.render('index');
});

/* spotify metadata search */
app.post('/search', function(req, res){
	var search_limit = 5;
	spotify.search({ type: 'track', query: req.body.q }, function(err, data) {
	    if (err) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    if(data.info.num_results > search_limit) {
	    	data.info.num_results = search_limit;
	    }
	    res.render('search', {
	    	results: data
	    });
	});
});

app.post('/art', function(req, res){
	var uri = req.body.uri
    var url = 'https://embed.spotify.com/oembed/?url='+uri;

    var options = {
    	url: url,
    	headers: {
    		'User-Agent': 'open-uri'
    	}
    };

    request(options, function(error, response, body){
    	body = JSON.parse(body);
    	body.uri = uri;
	    res.render('art', {
	    	art: body
	    });
    });


});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

