var express = require('express');
var app = express();

app.get('/o.wkf/read/*', function (req, res){
	var path = req.params[0]?req.params[0]:"notfound";
	var lastDot = path.lastIndexOf('.');
	if (lastDot > 0)
	{
		path = './o.wkf/' + path.substring(0,lastDot).replace(/\./g,'/');
		res.sendFile(req.params[0] +'.json', {root: path});
	}
	else
		res.status(404).send('Not found');
});

var server = app.listen(8180, function(){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Well-known field service listening at http://%s:%s', host, port);
});
