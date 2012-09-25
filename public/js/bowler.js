$(function() {

  var $cam = $('#cam');

  // Reload the cam every 2000ms
  setInterval(function() {
    $cam.attr('src', $cam.attr('src'));
  }, 2000);

});