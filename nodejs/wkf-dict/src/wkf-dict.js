var express = require('express');
var app = express();
var oWKFName = 'o.wkf.name';

app.get('/o.wkf/read', function (req, res){
	var path = req.query[oWKFName]?req.query[oWKFName]:"notfound";
	var lastDot = path.lastIndexOf('.');
	if (lastDot > 0)
	{
		path = './o.wkf/' + path.substring(0,lastDot).replace(/\./g,'/');
		res.sendFile(req.query[oWKFName] +'.json', {root: path});
	}
	else
		res.status(404).send('Not found');
});

var server = app.listen(8180, function(){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Well-known field service listening at http://%s:%s', host, port);
});
