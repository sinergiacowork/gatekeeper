var express = require('express')
var httpProxy = require('http-proxy');
var Stream = require('node-rtsp-stream');

var stream = new Stream({
    name: 'Door',
    streamUrl: process.env.RTSP_CONNECTION,
    wsPort: 9999
});

var spawn = require("child_process").spawn;
var proxy = httpProxy.createProxyServer({ ws: true });
var app = require("express")();

const MPEG_CONNECTION = 'http://localhost:9999/';

app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index.html');
});

app.get("/door.jpg", function(req, res) {
  res.sendFile("door.jpg", { root: "./tmp" });
});

app.get('/ws', function(req, res) {
  proxy.web(req, res, { target: MPEG_CONNECTION });
});

var server = require('http').createServer(app);
server.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head, { target: MPEG_CONNECTION });
})

server.listen(process.env.PORT);
