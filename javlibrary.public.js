// ==UserScript==
// @name                    JAV Library Assistant(Pub)
// @version                 1.0
// @include                 *://www.javlibrary.com/*/?v=*
// @grant                   none
// @license                 MIT
// ==/UserScript==
(function () {
  "use strict";

  try {
    var javl_bango = document.querySelector("#video_id table tbody tr td.text");
  } catch {}

  try {
    var pid = document.getElementsByClassName("btn_videoplayer").valueOf()[0].attributes[1].value;
    var parent = document.getElementsByClassName("previewthumbs")[0];
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
    var preview = parent.appendChild(document.createElement("iframe"));
    preview.src = "https://www.dmm.co.jp/service/digitalapi/-/html5_player/=/cid="+pid+"/mtype=CARdWwNE/service=digital/floor=videoa/mode=list/"
    preview.width = 640;
    preview.height = 360;
    preview.allow = "fullscreen";
    preview.scrolling = "no";
  } catch {}
  
  try {
    // JAVLIBRARY

    // misc
    // remove title link
    document
      .querySelector("#video_title h3.post-title.text a")
      .removeAttribute("href");

    // bango
    javl_bango = javl_bango.innerText;
    // title
    var javl_title = document.querySelector("#video_title h3.post-title.text");
    var ori_title = javl_title.innerText;

    // btn: javbus
    var javbus = document.createElement("a");
    javbus.setAttribute("class", "smallbutton");
    javbus.setAttribute("target", "_blank");
    javbus.setAttribute("href", "https://www.javbus.com/" + javl_bango);
    javbus.innerText = "JavBus";
    javl_title.append(javbus);

    // btn: sukebei
    var sukebei = document.createElement("a");
    sukebei.setAttribute("class", "smallbutton");
    sukebei.setAttribute("target", "_blank");
    sukebei.setAttribute("href", "https://sukebei.nyaa.si/?q=" + javl_bango);
    sukebei.innerText = "Sekubei";
    javl_title.append(sukebei);
  } catch {}
})();


