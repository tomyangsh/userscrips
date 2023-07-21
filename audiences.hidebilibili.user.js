// ==UserScript==
// @name        BiliBili！滚粗克！！！
// @namespace   https://github.com/tomyangsh/userscrips
// @include     https://audiences.me/torrents.php*
// @version     1.0
// @author      大統領
// ==/UserScript==

function hide() {
  document.querySelector('#torrenttable').querySelectorAll(':scope > tbody > tr').forEach(function hide(node) {
    node.querySelectorAll('span').forEach( function(des) {
      if (des.innerText.match('bilibili大陆')) {
        node.setAttribute("hidden", "hidden");
      }
    })
  });
}

hide()
