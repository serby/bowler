var http = require('http')
  , os = require('os')
  ;
module.exports = function (req, res) {
  var  info = {
    arch: process.arch,
      platform: process.platform,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime(),
      loadAvg: os.loadavg()
    };
  res.render('index', { title: 'Bowler', info: JSON.stringify(info) });
};