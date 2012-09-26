var exec = require('child_process').exec
  , child
	, ready = false
	;

function snap() {
	if (!ready) {
		return false;
	}
	ready = false;
	child = exec('streamer -c /dev/video0 -s 544x288 -b 16 -o ' + __dirname + '/public/images/cam.jpeg', function (error, stdout, stderr) {
		ready = true;
		console.log('Snap', error, stdout, stderr);  
	});
}

setInterval(snap, 2000);
