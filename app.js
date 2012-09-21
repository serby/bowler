var http = require('http')
  , os = require('os')
  ;

http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/plain'});
  var info = {
    arch: process.arch,
    platform: process.platform,
    memoryUsage: process.memoryUsage(),
    uptime: process.uptime(),
    loadAvg: os.loadavg()
  };
  res.write(JSON.stringify(info));
  res.end();

}).listen(1337);