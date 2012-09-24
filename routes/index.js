var http = require('http')
  , os = require('os')
  , info = {
    arch: process.arch,
      platform: process.platform,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime(),
      loadAvg: os.loadavg()
    };

module.exports = function (req, res) {
  res.render('index', { title: 'Bowler', info: JSON.stringify(info) });
};