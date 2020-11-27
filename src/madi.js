// COPIE CODE SAMIHA + REJOUT SONG GAME OVER
import { musiqueGameOver } from 'data';
import { game } from 'maureen';

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    const t = getTimeRemaining(endtime);

    secondsSpan.innerHTML = `0${t.seconds}`.slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
      musiqueGameOver.play();
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

// CODE QUE QUAND ON CLIQUE SUR BTN LE LABYRINTHE SE LANCE ( PAS TROP LOIN)
$('btnGo').on('click', function () {
  $('canva').css('display', 'none');
  $('#clockDiv').css('display', 'none');
});
