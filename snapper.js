var exec = require('child_process').exec
	, fs = require('fs')
  , child
	, ready = true
	;

function snap() {
	if (!ready) {
		return false;
	}
	ready = false;
	child = exec('streamer -c /dev/video0 -s 544x288 -b 16 -o ' + __dirname + '/public/images/cam.jpeg', function (error, stdout, stderr) {
		ready = true;
		console.log(new Date(), 'Snap', error, stdout, stderr);
	});
}

setInterval(snap, 2000);