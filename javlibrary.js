// ==UserScript==
// @name                    JAV Library Assistant
// @version                 1.0
// @include                 *://www.javlibrary.com/*/?v=*
// @include                 https://kp.m-team.cc/upload.php#fillinfo=*
// @require                 https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js
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
    var img = document.querySelector("#video_jacket_img").src;

    // btn: copy title
    var javl_copy_button = document.createElement("button");
    javl_copy_button.setAttribute("class", "copy smallbutton");
    javl_copy_button.setAttribute(
      "data-clipboard-target",
      "#video_title > h3 > a"
    );
    javl_copy_button.innerText = "COPY TITLE";
    javl_title.append(javl_copy_button);

    // btn: copy bango
    var javl_copy_bango = document.querySelector("#video_id table");
    javl_copy_bango.setAttribute("class", "copy");
    javl_copy_bango.setAttribute(
      "data-clipboard-target",
      "#video_id > table > tbody > tr > td.text"
    );

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
    
    // btn: m-team
    var mteam = document.createElement("a");
    mteam.setAttribute("class", "smallbutton");
    mteam.setAttribute("target", "_blank");
    mteam.setAttribute("href", "https://kp.m-team.cc/adult.php?search=" + javl_bango);
    mteam.innerText = "M-Team";
    javl_title.append(mteam);
    
    // btn: autofill
    var autofill = document.createElement("a");
    autofill.setAttribute("class", "smallbutton");
    autofill.setAttribute("target", "_blank");
    autofill.setAttribute("href", 'https://kp.m-team.cc/upload.php#fillinfo={"javl_bango":"' + javl_bango + '","title":"' + ori_title + '","description":"\n[img]'+ img +'[/img]\n"}');
    autofill.innerText = "upload";
    javl_title.append(autofill);
  } catch {}

  try {
    var infojson = JSON.parse(decodeURIComponent(location.hash.match(/(^|#)fillinfo=([^#]*)(#|$)/)[2]))
    var input=document.querySelector('#name');
    input.value=infojson.title;
    var input=document.querySelector('#dmmtxt');
    input.value=infojson.javl_bango;
    var input=document.querySelector('#descr');
    input.value=infojson.description;
    document.getElementById("browsecat").value=410;
    document.getElementsByName("codec_sel")[0].value=1;
    document.getElementsByName("standard_sel")[0].value=1;
    document.getElementsByName("processing_sel")[0].value=4;
    document.getElementsByName("uplver")[0].checked=true;
    document.getElementsByClassName("codebuttons")[0].click();
  } catch {}
  
  var clipboard = new ClipboardJS(".copy");

  clipboard.on("success", function (e) {
    console.info("Action:", e.action);
    console.info("Text:", e.text);
    console.info("Trigger:", e.trigger);

    e.clearSelection();
  });

  clipboard.on("error", function (e) {
    console.error("Action:", e.action);
    console.error("Trigger:", e.trigger);
  });
})();


