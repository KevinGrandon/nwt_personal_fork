/**
 * The testserver loads the test script
 * and provides various methods to test against
 * 
 * To run the testserver:
 * 	Run:		node test/testserver.js
 *  Navigate:	http://localhost:3000/test
 *  
 */

var express = require("express"),

	querystring = require('querystring'),

	util = require('util'),

	app = express.createServer();

app.set('views', __dirname + '/views');

app.set('view options', {
  layout: __dirname + '/views/layout'
});

app.use(express.static(__dirname + '/../src'));
app.use(express.static(__dirname + '/../'));

app.configure(function(){
	app.use(express.bodyParser());
});

app.get('/test', function(req, res){
	res.render('test.ejs');
});

app.get('/test/:subview', function(req, res){
	res.render('' + req.params.subview + '.ejs');
});

function getSimpleJson(req, res) {
	res.end('{"result": 1}');
}

app.post('/complexjson', function(req, res){
	res.end(JSON.stringify({
		results: [
			{one: 'bbq', two: 'ketchup', three: 'mustard'},
			{one: 'dog', two: 'cat', three: 'raining'},
			{one: 'Dave', two: 'Logan', three: 'Tony'}
		]
	}));
});

app.get('/simplejson', getSimpleJson);
app.post('/simplejson', getSimpleJson);
app.put('/simplejson', getSimpleJson);
app.del('/simplejson', getSimpleJson);

app.get('/testheader', function(req, res) {res.end('{"header": "get"}');});
app.post('/testheader', function(req, res) {res.end('{"header": "post"}');});
app.put('/testheader', function(req, res) {res.end('{"header": "put"}');});
app.del('/testheader', function(req, res) {res.end('{"header": "delete"}');});

app.post('/checkcat', function(req, res) {

	if(req.param('cat')) {
		res.end(JSON.stringify({name: req.param('cat')}));
		return;
	}
	
	var formidable = require("formidable");
    var form = new formidable.IncomingForm();
    form.type="multipart";
    form.parse(req, function(err, fields, files) {
    	res.end(JSON.stringify({name: fields.cat}));
    });

});

app.listen(3000);
console.log('Server started on port 3000');