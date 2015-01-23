var express = require('express');
var spawn = require('child_process').spawn;
var app = express()

app.get('/door.jpg', function(req, res) {
  res.writeHead(200, {
    "Content-Type": "image/jpeg",
    "Cache-Control": "no-cache"
  });

  var ffmpeg = spawn("ffmpeg", [
    "-rtsp_transport", "tcp",
    "-i", process.env.RTSP_CONNECTION,
    "-f", "image2",
    "pipe:1"
  ]);
  ffmpeg.stdout.pipe(res);
});

require('http').createServer(app).listen(process.env.PORT);
