var lives = 3,
  array_spacecraft = [],
  score = {
    'falcon': 100,
    'infilter': 5,
    'jedi': 10,
    'slave': 15,
    'xwing': 20
  },
  falcon_width = 150,
  $falcon = null,
  finished = false;

/* create falcon */
function falcon() {
  $falcon = $('<img class="falcon" width=' + falcon_width + '>');
  $falcon.appendTo($('body'));
  $falcon.attr('src', "img/millenium_falcon.png");
  $falcon.data("score", score.falcon);
  $falcon.data("destroyed", false);
  moveFalcon();
}

function moveFalcon() {
  if ($falcon.position().left < $('body').width() && !$falcon.data("destroyed")) {
    setTimeout(function() {
      $falcon.css({
        left: $falcon.position().left + 1
      });
      moveFalcon();
    }, 10);
  } else {
    if (!$falcon.data("destroyed")) {
      deleteFalcon();
    }
  }
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
