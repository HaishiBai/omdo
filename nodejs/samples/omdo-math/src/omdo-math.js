var express = require('express');
var app = express();
var mValue = 'm.value';

app.get('/p.math.numberlist/v.math.sum', function (req, res){
	var numbers = req.query[mValue]?req.query[mValue].split(','):[];
	var sum = numbers.reduce(function(a,b){return parseFloat(a)+parseFloat(b);});
	res.send(sum.toString());
});

var server = app.listen(8280,function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('Sample math service listening at http://%s:%s', host, port);
});
