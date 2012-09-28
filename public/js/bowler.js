$(function() {

  var $cam = $('#cam')
    , $bowler = $('.bowler').first()
    , $bowlers = [$bowler]
    , coords
    , bowlerId = 0
    , i = 1
    , $used = []
    ;

  $cam.on('load', function() {
    addBowlers();
  });

  function reloadImage() {

    var image = new Image();

    image.onload = function() {
      $cam.replaceWith(image);
      $cam = $('#cam');
      addBowlers();
    };

    image.id = 'cam';
    image.src = '/images/cam.jpeg';

    setTimeout(function() {
      reloadImage();
    }, 1000);
  }

  function addBowlers() {

    function clearUp() {
      $bowlers = $used;
      $used = [];
    }

    function getBowler() {
      var $b = $bowlers.shift();
      if (!$b) {
        $b = $bowler.clone().appendTo('.cam-view');
      }
      $used.push($b);
      return $b;
    }

   coords = $cam.faceDetection();
    $.each(coords, function(key, coord) {

      var $b = getBowler()
        , r = $b.height() / $b.width()
        , sw = coord.width * 1.8
        ;

      $b.css({
        'transform': 'rotate(' + (-5 + Math.random() * 10) + 'deg)'
      });
      $b.animate({
        width: sw,
        height: sw * r,
        top: coord.y - (coord.height * 0.9),

        left: (coord.x + (coord.width / 2) - (sw * 0.45))
      });

      $b.show();
    });

    $.each($bowlers, function(key, $bowler) {
      $bowler.hide('fade');
    });


    clearUp();

  }
  reloadImage();

});