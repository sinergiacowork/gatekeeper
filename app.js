var spawn = require("child_process").spawn;
var app = require("express")();

var ffmpeg = spawn("ffmpeg", [
  "-rtsp_transport", "tcp",
  "-i", process.env.RTSP_CONNECTION,
  "-f", "image2",
  "-updatefirst", "1",
  "-r", "1/2",
  "tmp/door.jpg"
]);

app.get("/door.jpg", function(req, res) {
  res.sendFile("door.jpg", { root: "./tmp" });
});

require("http").createServer(app).listen(process.env.PORT);
