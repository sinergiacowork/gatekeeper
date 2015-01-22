var express = require('express')
var httpProxy = require('http-proxy');
var Stream = require('node-rtsp-stream');

var stream = new Stream({
    name: 'name',
    streamUrl: process.env.RTSP_CONNECTION,
    wsPort: 9999
});

var app = express()

app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));

var proxy = httpProxy.createProxyServer({ ws: true });

app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/ws', function(req, res) {
  proxy.web(req, res, { target: 'http://localhost:9999/'});
});

var server = require('http').createServer(app);
server.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head, { target: 'http://localhost:9999/'});
});

server.listen(process.env.PORT);
