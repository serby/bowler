var express = require('express')
  , app = express()
  , log = []
  , port = 1337
  ;

app.get('/', function(req, res) {
  res.send(log);
  res.end();
});

function rawJson(req, res, next) {
  req.json = {};
  if (req.method !== 'POST') {
    return next();
  }
  var raw = '';
  req.on('data', function(data) {
    raw += data.toString();
  });
  req.on('end', function() {
    try {
      req.json = JSON.parse(raw);
    } catch (e) {
    }
    next();
  });
}

app.all('/pulse', rawJson, function(req, res) {
  req.json.ip = req.ip;
  req.json.date = new Date();
  log.unshift(req.json);
  log = log.slice(0, 100);
  res.end();
});


app.listen(port);

console.log('Starting Mothership on http://localhost:' + port);