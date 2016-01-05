var lives = 3,
  array_spacecraft = [],
  score = {
    'millenium_falcon': 100,
    'infilter': 5,
    'jedi': 10,
    'slave': 15,
    'xwing': 20
  },
  spacecrafts = [
    'millenium_falcon',
    'infilter',
    'jedi',
    'slave',
    'xwing'
  ],
  falcon_width = 150,
  $falcon = null,
  falcon_tperiod = 0,
  finished = false;

/* create falcon */
function falcon() {
  $falcon = $('<img class="falcon" width=' + falcon_width + '>');
  $falcon.appendTo($('body'));
  $falcon.attr('src', "img/millenium_falcon.png");
  $falcon.data("score", score.millenium_falcon);
  $falcon.data("destroyed", false);
  falcon_tperiod = 0;
  moveFalcon();
}

function moveFalcon() {
  if ($falcon.position().left < $('body').width() && !$falcon.data("destroyed")) {
    setTimeout(function() {
      $falcon.css({
        left: $falcon.position().left + 1 + 'px',
        top: $falcon.position().top + senoidal() + 'px'
      });
      moveFalcon();
    }, 10);
  } else {
    if (!$falcon.data("destroyed")) {
      deleteFalcon();
    }
  }
}

function senoidal() {console.log(falcon_tperiod);
  if(falcon_tperiod <= 2*Math.PI) {
    falcon_tperiod += 0.02;
  }
  else {
    falcon_tperiod = 0;
  }
  return 2*Math.sin(falcon_tperiod);
}

function deleteFalcon() {
  $falcon.remove();
}

function destroyed($spacecraft) {
  $spacecraft.data("destroyed", true);
  $spacecraft.attr('src', 'img/explosion.png');
  setTimeout(function() {
    $spacecraft.remove();
  }, 1000);
}

function addScore(score) {
  $score = $('#score span');
  current = parseInt($score.html());
  $score.html(current + score);
}






$(document).on('click', '.falcon', function() {
  if (!finished) {
    addScore($(this).data("score"));
    destroyed($(this));
  }
});

$(function() {
  falcon();
});
