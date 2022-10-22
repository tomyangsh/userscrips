// ==UserScript==
// @name        youtube
// @namespace   https://github.com/tomyangsh/userscrips
// @include	https://www.youtube.com/watch*
// @grant       none
// @version     1.0
// ==/UserScript==

function openwithmpv() {
  setTimeout(function () {
    var parent = document.getElementsByTagName('h1')[1];
    var title = parent.childNodes[1];
    var mpv = document.createElement("a");
    mpv.href = 'mpv:' + document.baseURI;
    mpv.style = "color: #FFFFFF;";
    parent.replaceChild(mpv, title);
    mpv.appendChild(title);
  }, 2000);
}

openwithmpv()
