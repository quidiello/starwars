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
    'infilter',
    'jedi',
    'slave',
    'xwing'
  ],
  falcon_width = 150,
  spacecraft_height = 150,
  $falcon = null,
  SPEED = 1,
  falcon_tperiod = 0,
  max_spacecrafts = 7,
  finished = false;

/* create falcon */
function falcon() {
  $falcon = $('<img class="falcon" width=' + falcon_width + '>');
  $falcon.appendTo($('body'));
  $falcon.attr('src', "img/millenium_falcon.png");
  $falcon.data("score", score.millenium_falcon);
  $falcon.data("destroyed", false);
  var height = screen.height;
  $falcon.css({
    top: myRandom(0, height - 450)
  });
  falcon_tperiod = 0;
  moveFalcon();
}

function moveFalcon() {
  if (!$falcon.data("destroyed") && $falcon.position().left < $('body').width()) {
    setTimeout(function() {
      $falcon.css({
        left: $falcon.position().left + SPEED*3 + 'px',
        top: $falcon.position().top + sinusoidal() + 'px'
      });
      moveFalcon();
    }, 10);
  } else {
    if (!$falcon.data("destroyed")) {
      deleteFalcon();
    }
  }
}

function sinusoidal() {
  if (falcon_tperiod <= 2 * Math.PI) {
    falcon_tperiod += 0.02;
  } else {
    falcon_tperiod = 0;
  }
  return 2 * Math.sin(falcon_tperiod);
}

function deleteFalcon() {
  $falcon.remove();
}

function destroyed($spacecraft) {
  var isFalcon = $spacecraft.hasClass('falcon');
  $spacecraft.data("destroyed", true);
  $spacecraft.attr('src', 'img/explosion.png');
  setTimeout(function() {
    if (isFalcon) {
      $spacecraft.remove();
    }
    else {
      resetSpacecraft($spacecraft);
    }
  }, 1000);
}

function addScore(score) {
  $score = $('#score span');
  current = parseInt($score.html());
  $score.html(current + score);
}

function createSpacecraft() {
  var $spacecraft = $('<img class="spacecraft" height=' + spacecraft_height + '>');
  var type = spacecrafts[myRandom(0, spacecrafts.length - 1)];
  $spacecraft.attr('src', 'img/' + type + '.png');
  $spacecraft.appendTo($('body'));
  $spacecraft.data("score", score[type]);
  $spacecraft.data("destroyed", false);
  var width = screen.width;
  $spacecraft.css({
    left: myRandom(150, width - 150)
  });
  moveSpacecraft($spacecraft);
}

function resetSpacecraft($spacecraft) {
  var type = spacecrafts[myRandom(0, spacecrafts.length - 1)];
  $spacecraft.attr('src', 'img/' + type + '.png');
  $spacecraft.data("score", score[type]);
  $spacecraft.data("destroyed", false);
  var width = screen.width;
  var height = screen.height;
  $spacecraft.css({
    left: myRandom(150, width - 150),
    top: height
  });
  moveSpacecraft($spacecraft);
}

function moveSpacecraft($spacecraft) {
  if (!$spacecraft.data("destroyed") && $spacecraft.position().top > -spacecraft_height) {
    setTimeout(function() {
      $spacecraft.css({
        top: $spacecraft.position().top - SPEED + 'px'
      });
      moveSpacecraft($spacecraft);
    }, 10);
  } else {
    if (!$spacecraft.data("destroyed")) {
      loseLife();
      $spacecraft.remove();
      $spacecraft = createSpacecraft();
    }
  }
}

function loseLife() {
  $('#lives li:nth-child(' + lives + ')').addClass('grey');
  lives--;
  if (lives === 0) {
    finished = true;
    // mostrar
  }
}




function myRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).on('click', '.falcon', function() {
  if (!finished) {
    addScore($(this).data("score"));
    destroyed($(this));
  }
});

$(document).on('click', '.spacecraft', function() {
  if (!finished) {
    addScore($(this).data("score"));
    destroyed($(this));
  }
});

$(function() {
  falcon();
  for (var i = 0; i < max_spacecrafts; i++) {
    array_spacecraft.push(createSpacecraft());
  }
});
