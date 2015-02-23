var express = require('express');
var http = require('http');
var app = express();

var fs = require('fs');
var catalog = JSON.parse(fs.readFileSync('catalog.json', 'utf8'));
var friends = JSON.parse(fs.readFileSync('friends.json', 'utf8'));

app.get('/*', function (req, res){
	var words = req.path.substring(1).split('/');
	var results = [];
	catalog.forEach(function(entry){
		if (entry.object == words[0]
		    && entry.predicate == words[1])
		{
			var count = 0;
			entry.complements.forEach(function(complement){
				if (words.indexOf(complement)>=0)
					count++;
			});
			if (count == entry.complements.length)
				results.push(entry.url);
		}
	});
	if (results.length > 0)
	{
		friends.forEach(function(friend){
			var request = http.get(friend + req.path, function(response){
				if (('' + request.statusCode).match(/^2\d\d$/))
				{
					response.forEach(function(res){
						results.push(res.url);
					});
				}
			});
			request.on('error',function(e){
				console.log('failed checking ' + friend);
			});
		});		
	}
	res.send(results);
});

var server = app.listen(8190, function(){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Sample registry service listening at http://%s:%s', host, port);
});
