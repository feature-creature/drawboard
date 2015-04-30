// first node server
var http = require('http');
var path = require('path');
var fs = require('fs');

var handleRequest = function (request, response) {
	var pathname = request.url;

	if(pathname == '/'){
		pathname = '/index.html';
	}

	var ext	= path.extname(pathname);

	var typeExt = {
		'.html':'text/html',
		'.css':'text/css',
		'.js':'text/javascript'		
	};

	var contentType = typeExt[ext] || 'text/plain';

	fs.readFile(
		__dirname + pathname,
		function(err,data){
			if(err){
				response.writeHead(500);
				return response.end('error loading ' + pathname);
			}else{
				response.writeHead(200, {'contentType': contentType});
				response.end(data);
			}	
		}
	);
};

var server = http.createServer(handleRequest);
server.listen(8080);
var io = require('socket.io').listen(server);

console.log('server started on port 8080');

io.sockets.on(
	'connection',
	function (socket) {
	  console.log("We have a new client: " + socket.id);
	  socket.on('disconnect', function() {
	    console.log("Client has disconnected");
	  });
		socket.on(
			'mouse',
			function(data){
				console.log('received mouse data: ' + data.x + "," + data.y + "," + data.z + ".");
				socket.broadcast.emit('mouse',data);
			}
		)
	}
);






