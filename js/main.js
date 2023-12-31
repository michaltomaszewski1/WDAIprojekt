
window.prevOffset = 0;
let scrollThrottle = 0;
const scrollHeader = document.getElementById('header');
const content = document.getElementById('content');
const mute_button = document.getElementById('mute_button');

let scroll = function () {
  if(new Date().getTime()-scrollThrottle < 200) {
    return false;
  }
  scrollThrottle = (new Date()).getTime();
  let tempOffset = window.scrollY;

  if(tempOffset > window.prevOffset + 25 || tempOffset < 100) {
    scrollHeader.style.top = '-' + scrollHeader.clientHeight.toString() + 'px';
  }
  if (tempOffset < window.prevOffset - 25 || tempOffset < 75) {
    scrollHeader.style.top = '0px';
  }
  window.prevOffset = window.scrollY;
  content.style.marginTop = scrollHeader.clientHeight.toString()+'px';
  if (mute_button != null) {
    mute_button.style.marginTop = scrollHeader.clientHeight.toString() + 'px';
  }
  setTimeout(scroll, 333);
}
window.addEventListener('scroll', scroll);
scroll();
