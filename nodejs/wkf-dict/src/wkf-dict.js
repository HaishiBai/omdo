var express = require('express');
var app = express();
var oWKFName = 'f.wkf.name';

app.get('/f.wk(f|v)/v.read', function (req, res){
	var path = req.query[oWKFName]?req.query[oWKFName]:"notfound";
	var root = (req.path == '/f.wkf/v.read') ? './f/':'./v/'; 
	var lastDot = path.lastIndexOf('.');
	if (lastDot > 0)
	{
		if (lastDot == 1)
			path = root;
		else
			path = root + path.substring(0,lastDot).replace(/\./g,'/');
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
