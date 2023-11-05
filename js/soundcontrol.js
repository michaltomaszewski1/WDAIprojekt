const pathname = window.location.pathname.substring(window.location.pathname.lastIndexOf('/'));
let sound;
switch (pathname) {
  case '/piwo.html':
    sound = new Audio('audio/kocham_piwo.mp3');
    sound.currentTime = 47;
    break;
  case '/wodka.html':
    sound = new Audio('audio/wodko_ma.mp3');
    sound.currentTime = 31;
    break;
}
let icon = document.getElementById('mute_icon');
sound.autoplay = true;
sound.volume = 0.2;
if (sound.paused) {
  icon.src = 'img/muted_icon.svg'
}
function play_pause () {
  if (sound.paused || sound.ended) {
    sound.play();
    icon.src = 'img/playing_icon.svg';
  }
  else {
    sound.pause();
    icon.src = 'img/muted_icon.svg';
  }
}
