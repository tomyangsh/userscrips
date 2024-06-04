// ==UserScript==
// @name            二刺螈！滚粗克！！！
// @namespace       https://github.com/tomyangsh/userscrips
// @include         https://audiences.me/torrents.php*
// @version         1.0.2
// @author          大統領
// @icon            https://audiences.me/favicon.ico
// ==/UserScript==

function hide() {
  document.querySelectorAll('#torrenttable tr').forEach(node => {
    if (node.querySelector('.tdh')) {
      node.setAttribute("hidden", "hidden");
    }
  })
}

function unhide() {
  document.querySelectorAll('[hidden]').forEach(node => node.removeAttribute("hidden"));
}

toggle = document.createElement('input');
toggle.type = 'checkbox';
toggle.id = 'anime';
toggle.setAttribute('onclick', 'handleClick(this)');
toggle_lable = document.createElement('lable');
toggle_lable.for = 'anime';
toggle_lable.innerText = '二刺螈！';

document.querySelector('#torrenttable').before(toggle);
document.querySelector('#torrenttable').before(toggle_lable);

function handleClick(toggle) {
  if (toggle.checked) {
    unhide()
  } else {
    hide()
  }
}

unsafeWindow.handleClick = handleClick;

hide()
