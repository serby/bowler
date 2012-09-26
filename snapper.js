var exec = require('child_process').exec
  child;

child = exec('streamer -c /dev/video0 -s 544x288 -b 16 -o public/images/cam.jpeg',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});
