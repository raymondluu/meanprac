var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, './client/static')));
app.use(bodyParser.urlencoded());
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 8888));
app.get('/', function(req, res) {
 res.render('index');
});
var server = app.listen(app.get('port'), function() {
  console.log('listening on port', app.get('port'));
});
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  console.log('SERVER::WE ARE USING SOCKETS!');
  console.log(socket.id);

  socket.on("javascript", function(data) {
  	console.log("a vote for javascript");
  	io.sockets.emit("update_javascript");
  });
  socket.on("swift", function(data) {
  	console.log("a vote for swift");
  	io.sockets.emit("update_swift");
  });
});